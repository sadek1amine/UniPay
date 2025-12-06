"use client";
import React, { useEffect, useState } from "react";
import { RightSidebar2 } from "@/comp2/RightSidebar2";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { listTransactions } from "@/lib/actions/VIPoperations.actions";
import {
  getAllReports,
  getBranchBalance,
  getTransactionsCount,
  getActiveEmployeesCount,
} from "@/lib/actions/reports.actions";
import { handleCreateReport } from "@/lib/actions/createReport.action";

type TransactionWithBranch = {
  $id: string;
  name: string;
  amount: number;
  category: string;
  channel: string;
  date: string;
  nTeller: string;
  status?: string;
};

type Report = {
  $id: string;
  type?: string;
  text: string;
  generated_at: string;
};

const transactionCategoryStyles: {
  [key: string]: { chipBackgroundColor: string };
} = {
  utilities: { chipBackgroundColor: "bg-yellow-100 text-yellow-700" },
  salary: { chipBackgroundColor: "bg-green-100 text-green-700" },
  shopping: { chipBackgroundColor: "bg-red-100 text-red-700" },
  refund: { chipBackgroundColor: "bg-blue-100 text-blue-700" },
  investment: { chipBackgroundColor: "bg-purple-100 text-purple-700" },
};

const BranchManagerHome = () => {
  const loggedIn = { firstName: "fathi" };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    solde: number;
    transactionsCount: number;
    employesActifs: number;
    allTransactions: TransactionWithBranch[];
    reports: Report[];
  }>({
    solde: 0,
    transactionsCount: 0,
    employesActifs: 0,
    allTransactions: [],
    reports: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [solde, transactionsCount, employesActifs, allTransactions, reports] =
          await Promise.all([
            getBranchBalance().catch(() => 0),
            getTransactionsCount().catch(() => 0),
            getActiveEmployeesCount().catch(() => 0),
            listTransactions().catch(() => [] as TransactionWithBranch[]),
            getAllReports().catch(() => [] as Report[]),
          ]);

        setData({
          solde,
          transactionsCount,
          employesActifs,
          allTransactions,
          reports,
        });
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const { solde, transactionsCount, employesActifs, allTransactions, reports } = data;
  const vipTransactions = allTransactions.filter((t) => t.amount > 500000);

  return (
    <section className="flex flex-col md:flex-row gap-4 p-6 bg-[#f9fafb] min-h-screen">
      <div className="flex-1 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-800">
            Bienvenue, {loggedIn?.firstName || "Manager"} 👋
          </h1>
          <p className="text-gray-600">
            Voici un aperçu des performances de votre agence aujourd'hui.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Solde total de l'agence"
            value={`${solde.toLocaleString()} $`}
            color="green"
          />
          <StatCard
            title="Nombre d'opérations aujourd'hui"
            value={transactionsCount.toString()}
            color="blue"
          />
          <StatCard
            title="Employés actifs"
            value={employesActifs.toString()}
            color="purple"
          />
        </div>

        {/* Tableau VIP */}
        <div className="bg-white shadow-xl rounded-2xl p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Transactions Clients VIP 💎
            </h3>
            <Button variant="default">Exporter PDF</Button>
          </div>
          <Table>
            <TableHeader className="bg-[#f9fafb]">
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="max-md:hidden">Canal</TableHead>
                <TableHead className="max-md:hidden">Catégorie</TableHead>
                <TableHead>Responsable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vipTransactions.length > 0 ? (
                vipTransactions.map((tx) => (
                  <TableRow key={tx.$id} className="bg-[#F6FEF9]">
                    <TableCell>{tx.name}</TableCell>
                    <TableCell
                      className={cn(
                        "font-semibold",
                        tx.amount > 0 ? "text-[#039855]" : "text-[#f04438]"
                      )}
                    >
                      {tx.amount.toLocaleString()} $
                    </TableCell>
                    <TableCell>{tx.status || "Validée"}</TableCell>
                    <TableCell>
                      {new Date(tx.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="capitalize max-md:hidden">
                      {tx.channel}
                    </TableCell>
                    <TableCell className="max-md:hidden">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          transactionCategoryStyles[tx.category]
                            ?.chipBackgroundColor || "bg-gray-200 text-gray-700"
                        )}
                      >
                        {tx.category}
                      </span>
                    </TableCell>
                    <TableCell>{tx.nTeller}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Aucune transaction VIP trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Derniers rapports */}
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

      <RightSidebar2 name={loggedIn} />
    </section>
  );
};

const StatCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) => (
  <div className="bg-white shadow-md rounded-2xl p-5">
    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    <p
      className={cn("text-3xl font-bold mt-2", {
        "text-green-600": color === "green",
        "text-blue-600": color === "blue",
        "text-purple-600": color === "purple",
      })}
    >
      {value}
    </p>
    <p className="text-sm text-gray-500 mt-1">Mis à jour il y a 5 minutes</p>
    <Button variant="outline" className="mt-4 w-full">
      Détails
    </Button>
  </div>
);

export default BranchManagerHome;