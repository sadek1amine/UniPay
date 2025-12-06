"use client";

import React, { useEffect, useState } from "react";
import {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/lib/actions/employee.action";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Employee {
  $id: string;
  firstName: string;
  lastName: string;
  email: string;
  adresst: string;
  role: string;
  numeroTelephone: string;
  branch: string;
  Nbranch: string;
}

const EmployeesTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Employee, "$id">>({
    firstName: "",
    lastName: "",
    email: "",
    adresst: "",
    role: "",
    numeroTelephone: "",
    branch: "",
    Nbranch: "",
  });

  // Fetch employees from database
  const fetchEmployees = async () => {
    try {
      const data = await listEmployees();
      setEmployees(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Delete employee
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cet employé ?");
    if (!confirmed) return;

    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // Start editing an employee
  const startEdit = (employee: Employee) => {
    setEditingId(employee.$id);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      adresst: employee.adresst,
      role: employee.role,
      numeroTelephone: employee.numeroTelephone,
      branch: employee.branch,
      Nbranch: employee.Nbranch,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      adresst: "",
      role: "",
      numeroTelephone: "",
      branch: "",
      Nbranch: "",
    });
  };

  // Save edited employee
  const saveEdit = async () => {
    if (!editingId) return;

    try {
      await updateEmployee(editingId, formData);
      fetchEmployees();
      cancelEdit();
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    }
  };

  // Save new employee
  const saveNewEmployee = async () => {
    try {
      await createEmployee(formData);
      fetchEmployees();
      setIsAdding(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        adresst: "",
        role: "",
        numeroTelephone: "",
        branch: "",
        Nbranch: "",
      });
    } catch (error) {
      console.error("Erreur d'ajout :", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Liste des employés</h2>
      
      {/* Add Employee Form */}
      {isAdding && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Ajouter un nouvel employé</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <Input
              name="lastName"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              name="numeroTelephone"
              placeholder="Téléphone"
              value={formData.numeroTelephone}
              onChange={handleInputChange}
            />
            <Input
              name="adresst"
              placeholder="Adresse"
              value={formData.adresst}
              onChange={handleInputChange}
            />
            <Input
              name="role"
              placeholder="Poste"
              value={formData.role}
              onChange={handleInputChange}
            />
            <Input
              name="branch"
              placeholder="ID de l'agence"
              value={formData.branch}
              onChange={handleInputChange}
            />
            <Input
              name="Nbranch"
              placeholder="Nom de l'agence"
              value={formData.Nbranch}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Annuler
            </Button>
            <Button onClick={saveNewEmployee}>Enregistrer</Button>
          </div>
        </div>
      )}

      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="px-2">Nom complet</TableHead>
            <TableHead className="px-2">Poste</TableHead>
            <TableHead className="px-2">Email</TableHead>
            <TableHead className="px-2">Téléphone</TableHead>
            <TableHead className="px-2">Adresse</TableHead>
            <TableHead className="px-2">Agence</TableHead>
            <TableHead className="px-2">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map(emp => (
            <React.Fragment key={emp.$id}>
              {editingId === emp.$id ? (
                <TableRow className="bg-blue-50">
                  <TableCell colSpan={7}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="numeroTelephone"
                        value={formData.numeroTelephone}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="adresst"
                        value={formData.adresst}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="Nbranch"
                        value={formData.Nbranch}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="outline" onClick={cancelEdit}>
                        Annuler
                      </Button>
                      <Button onClick={saveEdit}>Enregistrer</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow className="border-b">
                  <TableCell>{emp.firstName} {emp.lastName}</TableCell>
                  <TableCell>{emp.role}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.numeroTelephone}</TableCell>
                  <TableCell>{emp.adresst}</TableCell>
                  <TableCell>{emp.Nbranch || "Non défini"}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      onClick={() => startEdit(emp)}
                      variant="outline"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleDelete(emp.$id)}
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)}>
            Ajouter un employé
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmployeesTable;