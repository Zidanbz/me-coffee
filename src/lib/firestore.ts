'use server';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import {db} from './firebase';
import type {Ingredient, Transaction, ClientTransaction} from '@/types';

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

// Transaction functions
export async function getTransactions(): Promise<ClientTransaction[]> {
  const querySnapshot = await getDocs(collection(db, 'transactions'));
  const transactions: ClientTransaction[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    transactions.push({ 
      id: doc.id, 
      ...data,
      date: data.date.toDate().toISOString() 
    } as ClientTransaction);
  });
  // sort by date descending
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>) {
  const docRef = await addDoc(collection(db, 'transactions'), transaction);
  return docRef.id;
}
