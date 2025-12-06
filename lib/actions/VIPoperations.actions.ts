'use server';

import { createAdminClient } from '../appwrite';
import { parseStringify } from '../utils';

const DATABASE_ID = '68195cd00039faa7423d';
const TRANSACTIONS_COLLECTION = '6848244a0037124b714a';
const BRANCH_COLLECTION = '68481dba003c44cb2208';

export type TransactionWithBranch = {
  $id: string;
  name: string;
  amount: number;
  category: string;
  senderId: string;
  receiverBankId: string;
  receiverId: string;
  senderBankId: string;
  date: string;
  branch?: string[];
  tellerId: string;
  channel: string;
  nTeller: string;
};

export async function listTransactions(): Promise<TransactionWithBranch[]> {
  try {
    const { database } = await createAdminClient();
    const res = await database.listDocuments(DATABASE_ID, TRANSACTIONS_COLLECTION);
    const raw = parseStringify(res.documents) as any[];

    const withBranchName = await Promise.all(
      raw.map(async (t) => {
        if (t.branch?.length) {
          try {
            await database.getDocument(DATABASE_ID, BRANCH_COLLECTION, t.branch[0]);
          } catch (e) {
            console.warn("Branch not found for:", t.branch[0]);
          }
        }

        return {
          ...t,
          amount: Number(t.amount), 
        };
      })
    );

    return withBranchName;
  } catch (err) {
    console.error('Error listing transactions:', err);
    return [];
  }
}
