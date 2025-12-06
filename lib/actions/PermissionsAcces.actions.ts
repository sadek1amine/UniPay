'use server';

import { ID } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { parseStringify } from '../utils';

const DATABASE_ID = '68195cd00039faa7423d';
const COLLECTION_ID = '68481ccb000ac5be3937';
const BRANCH_COLLECTION_ID = '68481dba003c44cb2208';

type BranchRelation = {
  $id: string;
  name: string;
};

type EmployeeWithBranch = {
  firstName: string;
  lastName: string;
  email: string;
  adresst: string;
  role: string;
  numeroTelephone: string;
  branch: string;
  Nbranch:string;
    role2: string;
};

// 🔹 جلب جميع الموظفين مع أسماء الفروع
export async function listEmployees() {
  try {
    const { database } = await createAdminClient();

    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
    const rawEmployees = parseStringify(res.documents) as EmployeeWithBranch[];

    const employeesWithBranch = await Promise.all(
      rawEmployees.map(async (emp) => {
        let agenceName = 'Agence non définie';
        const branchRef = emp.branch?.[0];

        if (branchRef && typeof branchRef === 'string') {
          try {
            const branchDoc = await database.getDocument(
              DATABASE_ID,
              BRANCH_COLLECTION_ID,
              branchRef
            );
            agenceName = (branchDoc as any).name || agenceName;
          } catch (e) {
            console.warn(`Erreur de branche pour employé ${emp.$id}:`, e);
          }
        }

        return {
          ...emp,
          agenceName,
        };
      })
    );

    return employeesWithBranch;
  } catch (err) {
    console.error('Error listing employees:', err);
    throw err;
  }
}
// 🔹 تحديث دور الموظف مع التأكد من القيود
export async function updateEmployeeRole(employeeId: string, newRole: string) {
  try {
    const { database } = await createAdminClient();

    // جلب بيانات الموظف الحالي
    const currentEmployee = await database.getDocument(DATABASE_ID, COLLECTION_ID, employeeId);
    const { Nbranch } = currentEmployee;

    // إذا الدور الجديد هو "administrateur"
    if (newRole === 'administrateur') {
      // تحقق إذا كان هناك مدير فعلي موجود بالفعل
      const admins = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        `equal("role2", "administrateur")`
      ]);

      if (admins.total > 0 && admins.documents[0].$id !== employeeId) {
        throw new Error("Il ne peut y avoir qu'un seul administrateur.");
      }
    }

    // إذا الدور الجديد هو "responsable d'agence"
    if (newRole === "responsable d'agence") {
      // تحقق من عدد المسؤولين في نفس الوكالة
      const responsables = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        `equal("role2", "responsable d'agence")`,
        `equal("Nbranch", "${Nbranch}")`
      ]);

      const alreadyExists = responsables.documents.find(emp => emp.$id !== employeeId);
      if (alreadyExists) {
        throw new Error(`Il y a déjà un responsable pour l'agence "${Nbranch}".`);
      }
    }

    // إذا لم يتم انتهاك أي قاعدة، نحدث الدور
    const res = await database.updateDocument(DATABASE_ID, COLLECTION_ID, employeeId, {
      role2: newRole,
    });

    return parseStringify(res);
  } catch (err) {
    console.error('Erreur mise à jour du rôle:', err);
    throw err;
  }
}
// 🔹 تحديث حالة الوصول (نشط/غير نشط)
export async function toggleEmployeeAccess(employeeId: string, currentState: boolean) {
  try {
    const { database } = await createAdminClient();

    const res = await database.updateDocument(DATABASE_ID, COLLECTION_ID, employeeId, {
      active: !currentState,
    });

    return parseStringify(res);
  } catch (err) {
    console.error('Erreur mise à jour de l\'accès:', err);
    throw err;
  }
}
export async function syncDisplayedRoleWithOfficial(employeeId: string) {
  try {
    const { database } = await createAdminClient();

    const employee = await database.getDocument(DATABASE_ID, COLLECTION_ID, employeeId);
    const { role2 } = employee;

    const updated = await database.updateDocument(DATABASE_ID, COLLECTION_ID, employeeId, {
      role: role2,
    });

    return parseStringify(updated);
  } catch (err) {
    console.error("Erreur lors de la synchronisation du rôle affiché:", err);
    throw err;
  }
}
