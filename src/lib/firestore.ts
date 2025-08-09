
'use server';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import {db} from './firebase';
import type {Ingredient, Transaction, ClientTransaction, UpdateTransaction} from '@/types';

// Ingredient functions
export async function getIngredients(): Promise<Ingredient[]> {
  const querySnapshot = await getDocs(collection(db, 'ingredients'));
  const items: Ingredient[] = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() } as Ingredient);
  });
  return items;
}

export async function addIngredient(item: Omit<Ingredient, 'id'>) {
  const docRef = await addDoc(collection(db, 'ingredients'), item);
  return docRef.id;
}

export async function updateIngredient(id: string, item: Partial<Omit<Ingredient, 'id'>>) {
  const docRef = doc(db, 'ingredients', id);
  await updateDoc(docRef, item);
}

export async function deleteIngredient(id: string) {
  const docRef = doc(db, 'ingredients', id);
  await deleteDoc(docRef);
}


// Transaction functions
export async function getTransactions(): Promise<ClientTransaction[]> {
  const querySnapshot = await getDocs(collection(db, 'transactions'));
  const transactions: ClientTransaction[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const createdAtTimestamp = data.createdAt as Timestamp;
    transactions.push({ 
      id: doc.id, 
      ...data,
      date: (data.date as Timestamp).toDate().toISOString(),
      createdAt: createdAtTimestamp ? createdAtTimestamp.toDate().toISOString() : new Date().toISOString()
    } as ClientTransaction);
  });
  // sort by date descending
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>) {
  const docRef = await addDoc(collection(db, 'transactions'), {
    ...transaction,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function updateTransaction(id: string, transaction: UpdateTransaction) {
  const docRef = doc(db, 'transactions', id);
  await updateDoc(docRef, transaction);
}

export async function deleteTransaction(id: string) {
  const docRef = doc(db, 'transactions', id);
  await deleteDoc(docRef);
}
