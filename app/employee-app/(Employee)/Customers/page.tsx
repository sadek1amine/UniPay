"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { listClients, type Client } from "@/lib/actions/client.actions"; // عدّل المسار حسب مشروعك

const CustomerTable = () => {
  const [customers, setCustomers] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await listClients();
        setCustomers(data);
      } catch (error) {
        console.error("Erreur lors du chargement des clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Liste des clients</h2>

      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <Table>
          <TableHeader className="bg-[#f9fafb]">
            <TableRow>
              <TableHead className="px-2">Nom</TableHead>
              <TableHead className="px-2">Prénom</TableHead>
              <TableHead className="px-2">Ville</TableHead>
              <TableHead className="px-2">Etat</TableHead>
              <TableHead className="px-2">Adresse</TableHead>
              <TableHead className="px-2">Date de naissance</TableHead>
              <TableHead className="px-2">Numéro SSN</TableHead>
              <TableHead className="px-2">Code Postal</TableHead>
              <TableHead className="px-2">Email</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {customers.map((customer, index) => (
              <TableRow
                key={customer.$id}
                className={
                  index % 2 === 0
                    ? "bg-[#F6FEF9] !border-b-DEFAULT"
                    : "bg-[#FFFBFA] !border-b-DEFAULT"
                }
              >
                <TableCell className="pl-2 pr-10">{customer.lastName}</TableCell>
                <TableCell className="pl-2 pr-10">{customer.firstName}</TableCell>
                <TableCell className="pl-2 pr-10">{customer.city}</TableCell>
                <TableCell className="pl-2 pr-10">{customer.state}</TableCell>
                <TableCell className="pl-2 pr-10">{customer.address1}</TableCell>
                <TableCell className="pl-2 pr-10">{customer.dateOfBirth}</TableCell>
                <TableCell className="pl-2 pr-10">{customer.ssn}</TableCell>
                <TableCell className="pl-2 pr-10">{customer.postalCode}</TableCell>
                <TableCell className="pl-2 pr-10">{customer.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CustomerTable;
