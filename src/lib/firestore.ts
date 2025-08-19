

'use server';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp,
  Timestamp,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import {db} from './firebase';
import type {Ingredient, Transaction, ClientTransaction, UpdateTransaction, NewTransaction} from '@/types';

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
export async function getTransactions({ month, year }: { month?: number, year?: number } = {}): Promise<ClientTransaction[]> {
  try {
    const transactionsRef = collection(db, 'transactions');
    
    let constraints = [orderBy('date', 'desc')];

    if (year && month) {
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

      constraints.push(where('date', '>=', startDate));
      constraints.push(where('date', '<', endDate));
    }

    const q = query(transactionsRef, ...constraints);
    const querySnapshot = await getDocs(q);

    const transactions: ClientTransaction[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      const createdAtTimestamp = data.createdAt as Timestamp | undefined;
      const createdAt = createdAtTimestamp ? createdAtTimestamp.toDate().toISOString() : new Date().toISOString();

      transactions.push({ 
        id: doc.id, 
        type: data.type,
        amount: data.amount,
        category: data.category,
        description: data.description,
        paymentMethod: data.paymentMethod,
        date: data.date, // Already a string 'YYYY-MM-DD'
        createdAt: createdAt,
      });
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}


export async function addTransaction(transaction: NewTransaction) {
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

