'use server';

import { ID } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { parseStringify } from '../utils';

const DATABASE_ID = '68195cd00039faa7423d';
const USER_COLLECTION_ID = '68195dc70005788077a2';

export type Client = {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  lastName: string;
  firstName: string;
  address1: string;
  city: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  state: string;
};


export async function listClients(): Promise<Client[]> {
  try {
    const { database } = await createAdminClient();

    const res = await database.listDocuments(DATABASE_ID, USER_COLLECTION_ID);
    return parseStringify(res.documents) as Client[];
  } catch (err) {
    console.error('Erreur lors de la récupération des clients:', err);
    throw err;
  }
}