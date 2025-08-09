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
import type {InventoryItem, Transaction} from '@/types';

// Inventory functions
export async function getInventoryItems() {
  const querySnapshot = await getDocs(collection(db, 'inventory'));
  const items: InventoryItem[] = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() } as InventoryItem);
  });
  return items;
}

export async function addInventoryItem(item: Omit<InventoryItem, 'id'>) {
  const docRef = await addDoc(collection(db, 'inventory'), item);
  return docRef.id;
}

// Transaction functions
export async function getTransactions() {
  const querySnapshot = await getDocs(collection(db, 'transactions'));
  const transactions: Transaction[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    transactions.push({ 
      id: doc.id, 
      ...data,
      date: data.date.toDate() 
    } as Transaction);
  });
  return transactions;
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>) {
  const docRef = await addDoc(collection(db, 'transactions'), transaction);
  return docRef.id;
}
