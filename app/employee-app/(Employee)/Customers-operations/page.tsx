"use client";

import React, { useState } from "react";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  amount: string;
  category: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  tellerId: string;
  nTeller: string;
  channel: string;
  branch: string;
}

const CustomerOperations = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    amount: "",
    category: "Transfer",
    senderId: "",
    senderBankId: "bank-xyz",
    receiverId: "",
    receiverBankId: "",
    tellerId: "teller-123",
    nTeller: "Karim Bensalah",
    channel: "guichet",
    branch: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate amount
    if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      setError("Montant invalide");
      setLoading(false);
      return;
    }

    try {
      await createTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date().toISOString(),
      });

      setSuccess("Transaction réussie !");
      // Reset form but keep some default values
      setFormData(prev => ({
        ...prev,
        name: "",
        amount: "",
        receiverId: "",
        receiverBankId: "",
        branch: "",
      }));
    } catch (err) {
      console.error("Transaction error:", err);
      setError(err instanceof Error ? err.message : "Échec de la transaction");
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { label: "Nom de l'opération", name: "name", type: "text", placeholder: "Ex: Transfert vers client" },
    { label: "Montant (MAD)", name: "amount", type: "number", placeholder: "Ex: 1000" },
    { label: "ID Client émetteur", name: "senderId", type: "text", placeholder: "ID du client" },
    { label: "ID Client destinataire", name: "receiverId", type: "text", placeholder: "ID du bénéficiaire" },
    { label: "ID Banque destinataire", name: "receiverBankId", type: "text", placeholder: "Code banque" },
    { label: "ID Agence", name: "branch", type: "text", placeholder: "Code agence" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Effectuer un transfert client
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {inputFields.map(({ label, name, type, placeholder }) => (
            <div key={name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof FormData]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Canal de transaction
            </label>
            <select
              name="channel"
              value={formData.channel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="guichet">Guichet</option>
              <option value="mobile">Mobile</option>
              <option value="internet">Internet</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Traitement en cours..." : "Valider la transaction"}
          </button>
        </form>

        {success && (
          <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-md text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOperations;