
import type { Timestamp } from 'firebase/firestore';

export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  date: string; // Stored as 'YYYY-MM-DD'
  category: string;
  amount: number;
  description: string;
  paymentMethod: 'Cash' | 'Card' | 'Online';
  createdAt: Timestamp;
};

// Type for data sent from server to client components
export type ClientTransaction = Omit<Transaction, 'createdAt'> & {
  createdAt: string; // ISO string
};

// Type for creating a new transaction from the form
export type NewTransaction = Omit<Transaction, 'id' | 'createdAt'>;

// Type for updating a transaction
export type UpdateTransaction = Partial<NewTransaction>;


export type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
};

    