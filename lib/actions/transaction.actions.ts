"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export interface Transaction {
  name: string;
  amount: string;
  channel: string;
  category: string;
  senderId: string;
  receiverId: string;
  senderBankId: string;
  receiverBankId: string;
  email: string;
  createdAt?: Date;
}

export const createTransaction = async (transaction: Transaction) => {
  try {
    const { database } = await createAdminClient();

    const newTransaction = await database.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: 'online',
        category: 'Transfer',
        ...transaction,
        createdAt: new Date().toISOString()
      }
    )

    return parseStringify(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error("Failed to create transaction");
  }
}

export const getTransactionsByBankId = async ({bankId}: {bankId: string}) => {
  try {
    const { database } = await createAdminClient();

    const senderTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('senderBankId', bankId)]
    )

    const receiverTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('receiverBankId', bankId)]
    );

    const transactions = {
      total: senderTransactions.total + receiverTransactions.total,
      documents: [
        ...senderTransactions.documents, 
        ...receiverTransactions.documents,
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return parseStringify(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}

export const getAllTransactions = async () => {
  try {
    const { database } = await createAdminClient();

    const transactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.orderDesc("createdAt")]
    );

    return parseStringify(transactions);
  } catch (error) {
    console.error("Error fetching all transactions:", error);
    throw new Error("Failed to fetch all transactions");
  }
}