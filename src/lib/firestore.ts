

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
import type {Ingredient, ClientTransaction, UpdateTransaction, NewTransaction} from '@/types';
import { startOfMonth, endOfMonth, format } from 'date-fns';

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
export async function getTransactions({ year, month }: { year?: string, month?: string } = {}): Promise<ClientTransaction[]> {
  try {
    const transactionsRef = collection(db, 'transactions');
    let q;

    if (year && month) {
      const yearNum = parseInt(year);
      const monthNum = parseInt(month) - 1; // month is 0-indexed in Date
      
      const startDate = startOfMonth(new Date(yearNum, monthNum));
      const endDate = endOfMonth(new Date(yearNum, monthNum));

      const startDateString = format(startDate, 'yyyy-MM-dd');
      const endDateString = format(endDate, 'yyyy-MM-dd');

      q = query(
        transactionsRef,
        orderBy('date', 'desc'),
        where('date', '>=', startDateString),
        where('date', '<=', endDateString)
      );
    } else {
      // Default query without date filter, just order by most recent
      q = query(transactionsRef, orderBy('date', 'desc'));
    }

    const querySnapshot = await getDocs(q);

    const transactions: ClientTransaction[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      const createdAtTimestamp = data.createdAt as Timestamp | undefined;
      const createdAt = createdAtTimestamp ? createdAtTimestamp.toDate().toISOString() : new Date().toISOString();
      
      let dateString = data.date;
      // Handle legacy date format if it's a Timestamp
      if (data.date instanceof Timestamp) {
        const date = data.date.toDate();
        dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      }

      transactions.push({ 
        id: doc.id, 
        type: data.type,
        amount: data.amount,
        category: data.category,
        description: data.description,
        paymentMethod: data.paymentMethod,
        date: dateString, // Already a string 'yyyy-MM-dd'
        createdAt: createdAt,
      });
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export async function getAvailableTransactionYears(): Promise<number[]> {
  try {
    const transactionsRef = collection(db, 'transactions');
    const q = query(transactionsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const years = new Set<number>();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      let dateString = data.date;

      if (data.date instanceof Timestamp) {
        dateString = data.date.toDate().toISOString().slice(0, 10);
      }
      
      if (typeof dateString === 'string') {
        const year = parseInt(dateString.slice(0, 4));
        if (!isNaN(year)) {
          years.add(year);
        }
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  } catch (error) {
    console.error("Error fetching available years:", error);
    return [new Date().getFullYear()]; // Fallback to current year
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
