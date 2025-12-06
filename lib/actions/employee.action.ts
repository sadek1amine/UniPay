'use server';

import { ID } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { parseStringify } from '../utils';

const DATABASE_ID = '68195cd00039faa7423d';
const COLLECTION_ID = '68481ccb000ac5be3937';
const BRANCH_COLLECTION_ID = '68481dba003c44cb2208';

// ---------------------
// Types
// ---------------------

type BranchRelation = {
  $id: string;
  name: string;
};

export interface EmployeeDocument {
  $id: string;
  firstName: string;
  lastName: string;
  email: string;
  adresst: string;
  role: string;
  numeroTelephone: string;
  password?: string;           // ← تمت إضافته هنا
  branch?: (string | BranchRelation)[];
  Nbranch?: string;
}

// ---------------------
// Create Employee
// ---------------------

export async function createEmployee(data: {
  firstName: string;
  lastName: string;
  email: string;
  adresst: string;
  role: string;
  numeroTelephone: string;
  branch: string;
  Nbranch: string;
  password: string;            // ← إضافة كلمة السر عند الإنشاء
}) {
  try {
    const { database } = await createAdminClient();
    const employeeId = ID.unique();

    const response = await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      employeeId,
      {
        employeeId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        adresst: data.adresst,
        role: data.role,
        numeroTelephone: data.numeroTelephone,
        password: data.password,    // ← حفظ كلمة السر
        branch: [data.branch],
        Nbranch: data.Nbranch
      }
    );

    return parseStringify(response);
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}

// ---------------------
// Get Employee by ID
// ---------------------

export async function getEmployeeById(employeeId: string) {
  try {
    const { database } = await createAdminClient();

    const employeeRaw = await database.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      employeeId
    );

    const employee = parseStringify(employeeRaw) as EmployeeDocument;

    let agenceName = 'Agence non définie';

    const branchRef = employee.branch?.[0];

    if (branchRef && typeof branchRef === 'string') {
      const branchData = await database.getDocument(
        DATABASE_ID,
        BRANCH_COLLECTION_ID,
        branchRef
      );
      agenceName = (branchData as any).name || agenceName;
    }

    return {
      ...employee,
      agenceName,
    };
  } catch (err) {
    console.error('Error fetching employee:', err);
    throw err;
  }
}

// ---------------------
// Update Employee
// ---------------------

export async function updateEmployee(employeeId: string, updates: Record<string, any>) {
  try {
    const { database } = await createAdminClient();

    const updated = await database.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      employeeId,
      updates
    );

    return parseStringify(updated);
  } catch (err) {
    console.error('Error updating employee:', err);
    throw err;
  }
}

// ---------------------
// Delete Employee
// ---------------------

export async function deleteEmployee(employeeId: string) {
  try {
    const { database } = await createAdminClient();

    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, employeeId);

    return { success: true };
  } catch (err) {
    console.error('Error deleting employee:', err);
    return { success: false, error: err };
  }
}

// ---------------------
// List Employees
// ---------------------

export async function listEmployees() {
  try {
    const { database } = await createAdminClient();

    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
    const rawEmployees = parseStringify(res.documents) as EmployeeDocument[];

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

// ---------------------
// Login Employee
// ---------------------

export async function loginEmployee(data: {
  email: string;
  password: string;
  role: string;
}) {
  try {
    const { database } = await createAdminClient();

    const res = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        `equal("email", "${data.email}")`,
        `equal("role", "${data.role}")`
      ]
    );

    if (res.documents.length === 0) {
      throw new Error("Employee not found");
    }

    const employee = parseStringify(res.documents[0]) as EmployeeDocument;

    if (!employee.password) {
      throw new Error("Password not set for this employee");
    }

    if (employee.password !== data.password) {
      throw new Error("Invalid password");
    }

    return employee;

  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
}
