
export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  date: Date;
  category: string;
  amount: number;
  description: string;
  paymentMethod: 'Cash' | 'Card' | 'Online';
  createdAt: any;
};

export type ClientTransaction = Omit<Transaction, 'date' | 'createdAt'> & {
  date: string;
  createdAt: string;
};

export type UpdateTransaction = Partial<Omit<Transaction, 'id' | 'createdAt'>>;


export type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
};
