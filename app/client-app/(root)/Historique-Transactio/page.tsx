'use client';

import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination';
import { formatterLeMontant } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { transactionCategoryStyles } from "@/constants";
import { listTransactions } from "@/lib/actions/transaction2.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TransactionHistory = ({ searchParams: { id, page }}: SearchParamProps) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    transactionId: "",
    date: "",
    clientName: "",
    amount: "",
    category: ""
  });

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await listTransactions();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error("Error loading transactions:", error);
      }
    };

    loadTransactions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const results = transactions.filter(tx => {
      return (
        (filters.transactionId === "" || tx.$id.includes(filters.transactionId)) &&
        (filters.date === "" || new Date(tx.date).toISOString().slice(0, 10) === filters.date) &&
        (filters.clientName === "" || tx.name.toLowerCase().includes(filters.clientName.toLowerCase())) &&
        (filters.amount === "" || tx.amount.includes(filters.amount)) &&
        (filters.category === "" || tx.category.toLowerCase().includes(filters.category.toLowerCase()))
      );
    });

    setFilteredTransactions(results);
  };

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox 
          title="Historique de Transaction"
          subtext="Voir vos informations bancaires et vos transactions"
        />
      </div>

      <div className="space-y-6">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
        >
          
          <Input
            name="date"
            type="date"
            placeholder="Date"
            value={filters.date}
            onChange={handleInputChange}
          />
         
          <Button type="submit" className="col-span-full md:col-span-1">
            Rechercher
          </Button>
        </form>

        {/* Transactions Table */}
        <Table>
          <TableHeader className="bg-[#f9fafb]">
            <TableRow>
              
              <TableHead>Nom</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="max-md:hidden">Canal</TableHead>
              <TableHead className="max-md:hidden">Catégorie</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => (
              <TableRow key={tx.$id}>
                
                <TableCell>{tx.name}</TableCell>
                <TableCell className={tx.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'}>
                  {formatterLeMontant(tx.amount)}
                </TableCell>
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                <TableCell className="max-md:hidden capitalize">{tx.channel}</TableCell>
                <TableCell className="max-md:hidden capitalize">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    (transactionCategoryStyles as any)[tx.category]?.chipBackgroundColor
                  )}>
                    {tx.category}
                  </span>
                </TableCell>
                <TableCell>Terminée</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="w-full flex-center mt-4">
            
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;