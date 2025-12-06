"use client"; /

import React from 'react';
import { RightSidebar2 } from '@/comp2/RightSidebar2';
import {
  getAllReports,
  getBranchBalance,
  getTransactionsCount,
  getActiveEmployeesCount,
} from "@/lib/actions/reports.actions";
import { handleCreateReport } from "@/lib/actions/createReport.action";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Operation {
  type: string;
  date: string;
  amount: number;
}

interface Report {
  $id: string;
  type?: string;
  text: string;
  generated_at: string;
}


interface EmployeeReportProps {
  totalEmployees: number;
  activeEmployees: number;
  suspendedEmployees: number;
}

const EmployeeReport = ({ totalEmployees, activeEmployees, suspendedEmployees }: EmployeeReportProps) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Employee Report</h3>
      <div className="text-gray-700">
        <p><strong>Total Employees:</strong> {totalEmployees}</p>
        <p><strong>Active Employees:</strong> {activeEmployees}</p>
        <p><strong>Suspended Employees:</strong> {suspendedEmployees}</p>
      </div>
    </div>
  );
};


interface FinancialPerformanceReportProps {
  totalRevenue: number;
  totalExpenses: number;
}

const FinancialPerformanceReport = ({ totalRevenue, totalExpenses }: FinancialPerformanceReportProps) => {
  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Performance</h3>
      <div className="text-gray-700">
        <p><strong>Total Revenue:</strong> ${totalRevenue}</p>
        <p><strong>Total Expenses:</strong> ${totalExpenses}</p>
        <p><strong>Net Profit:</strong> ${totalRevenue - totalExpenses}</p>
      </div>
    </div>
  );
};

export const AdminDash = () => {
  const loggedIn = { firstName: 'Yasin' };
  const [reports, setReports] = React.useState<Report[]>([]);

  const totalEmployees: number = 20;
  const activeEmployees: number = 15;
  const suspendedEmployees: number = 5;

  const operations: Operation[] = [
    { type: 'Deposit', date: '2025-06-01', amount: 5000 },
    { type: 'Withdrawal', date: '2025-06-02', amount: 2000 },
    { type: 'Transfer', date: '2025-06-03', amount: 1500 },
  ];

  const totalRevenue: number = 50000;
  const totalExpenses: number = 30000;

  React.useEffect(() => {
   
    const fetchReports = async () => {
      try {
        const allReports = await getAllReports();
        setReports(allReports);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };
    
    fetchReports();
  }, []);

  return (
    <section className="p-6 bg-gray-100 min-h-screen flex">
      <div className="max-w-6xl mx-auto flex-1">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {loggedIn.firstName}</h1>
          <p className="text-gray-600">Overview of your admin dashboard</p>
        </header>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <EmployeeReport
            totalEmployees={totalEmployees}
            activeEmployees={activeEmployees}
            suspendedEmployees={suspendedEmployees}
          />

          <FinancialPerformanceReport
            totalRevenue={totalRevenue}
            totalExpenses={totalExpenses}
          />
        </div>

       
        <div className="bg-white shadow-xl rounded-2xl p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">📑 Derniers rapports</h3>
            <form action={handleCreateReport}>
              <div className="flex gap-2">
                <input
                  name="text"
                  placeholder="Nouveau rapport..."
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                  required
                />
                <Button type="submit" variant="default">
                  Ajouter
                </Button>
              </div>
            </form>
          </div>

          <Table>
            <TableHeader className="bg-[#f9fafb]">
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Contenu</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.length > 0 ? (
                reports.map((rep) => (
                  <TableRow key={rep.$id}>
                    <TableCell className="capitalize">
                      {rep.type || "Général"}
                    </TableCell>
                    <TableCell>{rep.text}</TableCell>
                    <TableCell>
                      {new Date(rep.generated_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    Aucun rapport disponible
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* RightSidebar2 remains fixed */}
      <div className="w-64 fixed top-0 right-0 p-6 bg-white shadow-lg h-full">
        <RightSidebar2 name={loggedIn} />
      </div>
    </section>
  );
};

export default AdminDash;