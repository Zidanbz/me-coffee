import { getTransactions, getIngredients } from '@/lib/firestore';
import DashboardClient from '@/components/dashboard/dashboard-client';

export const revalidate = 0;

export default async function DashboardPage() {
  const [transactions, inventory] = await Promise.all([
    getTransactions({}),
    getIngredients()
  ]);
  
  return <DashboardClient transactions={transactions} inventory={inventory} />;
}
