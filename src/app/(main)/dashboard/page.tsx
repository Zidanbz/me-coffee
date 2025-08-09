
import StatCard from '@/components/dashboard/stat-card';
import RevenueChart from '@/components/dashboard/revenue-chart';
import { TrendingUp, TrendingDown, Package, DollarSign } from 'lucide-react';
import { getTransactions, getIngredients } from '@/lib/firestore';
import type { Transaction, Ingredient } from '@/types';

export default async function DashboardPage() {
  const [transactions, inventory] = await Promise.all([
    getTransactions(),
    getIngredients()
  ]);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  const todayTransactions = transactions.filter(t => isSameDay(t.date, today));
  const yesterdayTransactions = transactions.filter(t => isSameDay(t.date, yesterday));

  const todaysRevenue = todayTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const yesterdaysRevenue = yesterdayTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const revenueChange = yesterdaysRevenue === 0 ? 100 : ((todaysRevenue - yesterdaysRevenue) / yesterdaysRevenue) * 100;

  const todaysExpenses = todayTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const yesterdaysExpenses = yesterdayTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseChange = yesterdaysExpenses === 0 ? -100 : ((todaysExpenses - yesterdaysExpenses) / yesterdaysExpenses) * 100;

  const profit = todaysRevenue - todaysExpenses;
  const yesterdayProfit = yesterdaysRevenue - yesterdaysExpenses;
  const profitChange = yesterdayProfit === 0 ? 100 : ((profit - yesterdayProfit) / yesterdayProfit) * 100;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Revenue"
          value={`$${todaysRevenue.toFixed(2)}`}
          description={`${revenueChange >= 0 ? '+' : ''}${revenueChange.toFixed(1)}% from yesterday`}
          icon={<DollarSign className="w-4 h-4 text-muted-foreground" />}
        />
        <StatCard
          title="Today's Expenses"
          value={`$${todaysExpenses.toFixed(2)}`}
          description={`${expenseChange >= 0 ? '+' : ''}${expenseChange.toFixed(1)}% from yesterday`}
          icon={<TrendingDown className="w-4 h-4 text-muted-foreground" />}
        />
        <StatCard
          title="Profit"
          value={`$${profit.toFixed(2)}`}
          description={`${profitChange >= 0 ? '+' : ''}${profitChange.toFixed(1)}% from yesterday`}
          icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
        />
        <StatCard
          title="Items in Stock"
          value={inventory.length.toString()}
          description={`${inventory.length} ingredients available`}
          icon={<Package className="w-4 h-4 text-muted-foreground" />}
        />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <RevenueChart transactions={transactions} />
      </div>
    </div>
  );
}
