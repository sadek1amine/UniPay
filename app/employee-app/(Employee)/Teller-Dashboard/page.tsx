"use client";
import React from "react";
import { RightSidebar2 } from "@/comp2/RightSidebar2";
import {
  getAllReports,
  getBranchBalance,
  getTransactionsCount,
  getActiveEmployeesCount,
} from "@/lib/actions/reports.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Report {
  $id: string;
  type?: string;
  text: string;
  generated_at: string;
}

const EmployeeDash = () => {
  const loggedIn = { firstName: "amine" };
  const [reports, setReports] = React.useState<Report[]>([]);

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
    <section className="flex flex-col md:flex-row gap-4 p-6 bg-[#f9fafb] min-h-screen">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bienvenue, {loggedIn?.firstName || "Employé"} 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Voici votre tableau de bord personnel. Consultez vos tâches et suivez l'activité de l'agence.
        </p>

        {/* Vous pouvez ajouter ici du contenu supplémentaire pour l'employé */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Résumé du jour</h2>
          <p className="text-gray-500">Aucune tâche urgente pour le moment. Profitez pour organiser vos documents.</p>
        </div>

        {/* Reports Table */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Derniers rapports</h2>
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

      {/* Sidebar à droite */}
      <RightSidebar2 name={loggedIn} />
    </section>
  );
};

export default EmployeeDash;