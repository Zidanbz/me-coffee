
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
  try {
    const querySnapshot = await getDocs(collection(db, 'ingredients'));
    const items: Ingredient[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Basic validation to ensure the document has the required fields
      if (data.name && data.quantity !== undefined && data.unit && data.price !== undefined) {
        items.push({ id: doc.id, ...data } as Ingredient);
      } else {
        console.warn(`Skipping malformed ingredient document: ${doc.id}`);
      }
    });
    return items;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
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
  try {
    const querySnapshot = await getDocs(collection(db, 'transactions'));
    const transactions: ClientTransaction[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      const dateTimestamp = data.date as Timestamp | undefined;
      const createdAtTimestamp = data.createdAt as Timestamp | undefined;

      // Fallback to current date if timestamps are missing to prevent crash
      const date = dateTimestamp ? dateTimestamp.toDate() : new Date();
      const createdAt = createdAtTimestamp ? createdAtTimestamp.toDate() : new Date();

      transactions.push({ 
        id: doc.id, 
        type: data.type,
        amount: data.amount,
        category: data.category,
        description: data.description,
        paymentMethod: data.paymentMethod,
        date: date.toISOString(),
        createdAt: createdAt.toISOString(),
      });
    });
    // sort by date descending
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
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
