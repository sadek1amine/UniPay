'use client';

import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  listEmployees,
  updateEmployeeRole,
  toggleEmployeeAccess,
} from '@/lib/actions/PermissionsAcces.actions';

type EmployeeWithBranch = {
  $id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  active: boolean;
  agenceName: string;
};

const roles = ['Caissier', 'responsable d agence', 'administrateur'];

export const PermissionsAcces2 = () => {
  const [employees, setEmployees] = useState<EmployeeWithBranch[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔄 تحميل الموظفين عند التحميل الأول
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const result = await listEmployees();
        setEmployees(result);
      } catch (error) {
        console.error('Erreur lors du chargement des employés:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // 🧩 تغيير الدور
  const handleRoleChange = async (id: string, newRole: string) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.$id === id ? { ...emp, role: newRole } : emp))
    );
    try {
      await updateEmployeeRole(id, newRole);
    } catch (error) {
      console.error('Erreur mise à jour du rôle:', error);
    }
  };

 
  const handleAccessToggle = async (id: string, currentState: boolean) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.$id === id ? { ...emp, active: !emp.active } : emp))
    );
    try {
      await toggleEmployeeAccess(id, currentState);
    } catch (error) {
      console.error("Erreur mise à jour d'accès:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">🔐 Gérer les permissions d'accès</h2>

      {loading ? (
        <p>Chargement des employés...</p>
      ) : (
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Agence</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Accès</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.$id} className="hover:bg-gray-50">
                <TableCell>{`${emp.firstName} ${emp.lastName}`}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.agenceName}</TableCell>
                <TableCell>
                  <Select value={emp.role} onValueChange={(value) => handleRoleChange(emp.$id, value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choisir un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={emp.active}
                    onCheckedChange={() => handleAccessToggle(emp.$id, emp.active)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default PermissionsAcces2;
