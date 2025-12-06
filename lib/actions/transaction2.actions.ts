'use server';

import { ID, Query } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { parseStringify } from '../utils';

const APPWRITE_DATABASE_ID = '68195cd00039faa7423d';
const APPWRITE_TRANSACTION_COLLECTION_ID = '68195d5c0023497bb48b';

type Transaction = {
  $id: string;
  name: string;          
  amount: string;        
  channel: string;       
  category: string;      
  senderId: string;      
  receiverId: string;    
  senderBankId: string;  
  receiverBankId: string;
  email: string;         
  
  date?: string;
  tellerId?: string;
  nTeller?: string;
};

export async function listTransactions() {
  try {
    const { database } = await createAdminClient();
    const res = await database.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_TRANSACTION_COLLECTION_ID
    );

    const transactions = parseStringify(res.documents) as Transaction[];

    return transactions;
  } catch (err) {
    console.error('Error listing transactions:', err);
    throw err;
  }
}

export async function createTransaction(transaction: Omit<Transaction, '$id'>) {
  try {
    const { database } = await createAdminClient();
    const res = await database.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_TRANSACTION_COLLECTION_ID,
      ID.unique(),
      {
        name: transaction.name,
        amount: transaction.amount,
        channel: transaction.channel,
        category: transaction.category,
        senderId: transaction.senderId,
        receiverId: transaction.receiverId,
        senderBankId: transaction.senderBankId,
        receiverBankId: transaction.receiverBankId,
        email: transaction.email,
        // Optional fields:
        ...(transaction.date && { date: transaction.date }),
        ...(transaction.tellerId && { tellerId: transaction.tellerId }),
        ...(transaction.nTeller && { nTeller: transaction.nTeller }),
      }
    );

    return parseStringify(res);
  } catch (err) {
    console.error('Error creating transaction:', err);
    throw err;
  }
}

export async function getTransactionById(id: string) {
  try {
    const { database } = await createAdminClient();
    const res = await database.getDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_TRANSACTION_COLLECTION_ID,
      id
    );

    return parseStringify(res) as Transaction;
  } catch (err) {
    console.error('Error getting transaction:', err);
    throw err;
  }
}