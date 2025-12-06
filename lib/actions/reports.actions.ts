'use server';

import { createAdminClient } from '../appwrite';
import { Query } from 'node-appwrite';
import { parseStringify } from '../utils';

const DATABASE_ID = '68195cd00039faa7423d';
const APPWRITE_EMPLOYEE = '68481ccb000ac5be3937';
const APPWRITE_BRANCH = '68481dba003c44cb2208';
const APPWRITE_TRANSACTIONS = '6848244a0037124b714a';


export const getBranchBalance = async () => {
  const { database } = await createAdminClient();
  const res = await database.listDocuments(DATABASE_ID, APPWRITE_TRANSACTIONS);

  const total = res.documents.reduce((acc, txn) => {
    const amount = parseFloat(txn.amount);
    return acc + amount;
  }, 0);

  return total;
};


export const getTransactionsCount = async () => {
  const { database } = await createAdminClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = today.toISOString();

  const end = new Date(today);
  end.setDate(end.getDate() + 1);
  const endISOString = end.toISOString();

  const res = await database.listDocuments(DATABASE_ID, APPWRITE_TRANSACTIONS, [
    Query.greaterThanEqual("date", start),
    Query.lessThan("date", endISOString),
  ]);

  return res.total;
};


export const getActiveEmployeesCount = async () => {
  const { database } = await createAdminClient();

  const res = await database.listDocuments(DATABASE_ID, APPWRITE_EMPLOYEE, [
    Query.equal("isActive", true),
  ]);

  return res.total;
};


const REPORTS="68481e3e00272a5bd611";
export const getAllReports = async () => {
  const { database } = await createAdminClient();

  const res = await database.listDocuments(
    DATABASE_ID,
    REPORTS,
    [Query.orderDesc("generated_at")]
  );

  return res.documents;
};


export const createReport = async (text: string, type: string = "Général") => {
  const { database } = await createAdminClient();
  const id = crypto.randomUUID();

  const res = await database.createDocument(DATABASE_ID, REPORTS, id, {
    reportsId: id,
    text,
    type,
    generated_at: new Date().toISOString(),
  });

  return res;
};