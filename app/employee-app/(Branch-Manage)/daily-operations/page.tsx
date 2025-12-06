"use client";

import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { transactionCategoryStyles } from "@/constants";
import { listTransactions } from "@/lib/actions/operations.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DailyOperationsPage() {
  const [txns, setTxns] = useState<any[]>([]);
  const [filteredTxns, setFilteredTxns] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    transactionId: "",
    date: "",
    employeeName: "",
    clientId: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await listTransactions();
        setTxns(data);
        setFilteredTxns(data); // initialisé avec tout
      } catch (e) {
        console.error("Erreur chargement des transactions :", e);
      }
    })();
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = txns.filter(tx => {
      return (
        (filters.transactionId === "" || tx.$id.includes(filters.transactionId)) &&
        (filters.date === "" || new Date(tx.date).toISOString().slice(0, 10) === filters.date) &&
        (filters.employeeName === "" || tx.nTeller.toLowerCase().includes(filters.employeeName.toLowerCase())) &&
        (filters.clientId === "" || tx.senderId.includes(filters.clientId))
      );
    });

    setFilteredTxns(result);
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Voici les opérations effectuées aujourd'hui</h1>

      {/* Formulaire de recherche */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
      >
        <Input
          name="transactionId"
          type="text"
          placeholder="ID de transaction"
          className="col-span-1 w-full"
          value={filters.transactionId}
          onChange={handleInputChange}
        />
        <Input
          name="date"
          type="date"
          className="col-span-1 w-full"
          value={filters.date}
          onChange={handleInputChange}
        />
        <Input
          name="employeeName"
          type="text"
          placeholder="Nom de l'employé"
          className="col-span-1 w-full"
          value={filters.employeeName}
          onChange={handleInputChange}
        />
        <Input
          name="clientId"
          type="text"
          placeholder="ID du client"
          className="col-span-1 w-full"
          value={filters.clientId}
          onChange={handleInputChange}
        />
        <Button type="submit" className="col-span-full md:col-span-1 mt-2 md:mt-0 w-full">
          Rechercher
        </Button>
      </form>

      {/* Tableau des transactions */}
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="px-2 font-semibold text-lg text-[#4A4A4A]">Transaction</TableHead>
            <TableHead className="px-2 font-semibold text-lg text-[#4A4A4A]">Montant</TableHead>
            <TableHead className="px-2 font-semibold text-lg text-[#4A4A4A]">Statut</TableHead>
            <TableHead className="px-2 font-semibold text-lg text-[#4A4A4A]">Date</TableHead>
            <TableHead className="px-2 max-md:hidden font-semibold text-lg text-[#4A4A4A]">Canal</TableHead>
            <TableHead className="px-2 max-md:hidden font-semibold text-lg text-[#4A4A4A]">Catégorie</TableHead>
            <TableHead className="px-2 font-semibold text-lg text-[#4A4A4A]">Responsable</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredTxns.map(tx => (
            <TableRow key={tx.$id} className="bg-[#FFFBFA] !border-b-DEFAULT">
              <TableCell>{tx.name}</TableCell>
              <TableCell className={tx.amount.startsWith('-') ? 'text-[#f04438]' : 'text-[#039855]'}>
                {tx.amount}
              </TableCell>
              <TableCell className="capitalize">terminée</TableCell>
              <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
              <TableCell className="max-md:hidden capitalize">{tx.channel}</TableCell>
              <TableCell className="max-md:hidden capitalize">
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    (transactionCategoryStyles as any)[tx.category]?.chipBackgroundColor
                  )}
                >
                  {tx.category}
                </span>
              </TableCell>
              <TableCell>{tx.nTeller}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
