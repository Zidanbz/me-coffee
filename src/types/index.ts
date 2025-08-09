export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  date: Date;
  category: string;
  amount: number;
  description: string;
  paymentMethod: 'Cash' | 'Card' | 'Online';
};

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  minStock: number;
};
