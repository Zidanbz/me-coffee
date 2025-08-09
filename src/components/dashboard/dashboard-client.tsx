
"use client";

import { type ReactNode, useState, useEffect } from 'react';
import StatCard from '@/components/dashboard/stat-card';
import type { ClientTransaction, Ingredient } from '@/types';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Package, DollarSign } from 'lucide-react';

const RevenueChart = dynamic(() => import('@/components/dashboard/revenue-chart'), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px]" />,
});

type Stat = {
  title: string;
  value: string;
  description?: string;
  icon: ReactNode;
};

type DashboardClientProps = {
  transactions: ClientTransaction[];
  inventory: Ingredient[];
};

function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-3 w-40" />
      </CardContent>
    </Card>
  )
}


export default function DashboardClient({ transactions, inventory }: DashboardClientProps) {
  const [stats, setStats] = useState<Stat[] | null>(null);

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isSameDay = (d1: Date, d2: Date) => {
      return d1.getFullYear() === d2.getFullYear() &&
             d1.getMonth() === d2.getMonth() &&
             d1.getDate() === d2.getDate();
    }

    const todayTransactions = transactions.filter(t => isSameDay(new Date(t.date), today));
    const yesterdayTransactions = transactions.filter(t => isSameDay(new Date(t.date), yesterday));

    const todaysRevenue = todayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const yesterdaysRevenue = yesterdayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const revenueChange = yesterdaysRevenue === 0 ? (todaysRevenue > 0 ? 100 : 0) : ((todaysRevenue - yesterdaysRevenue) / yesterdaysRevenue) * 100;

    const todaysExpenses = todayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const yesterdaysExpenses = yesterdayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenseChange = yesterdaysExpenses === 0 ? (todaysExpenses > 0 ? 100 : 0) : ((todaysExpenses - yesterdaysExpenses) / yesterdaysExpenses) * 100;

    const profit = todaysRevenue - todaysExpenses;
    const yesterdayProfit = yesterdaysRevenue - yesterdaysExpenses;
    const profitChange = yesterdayProfit === 0 ? (profit > 0 ? 100 : 0) : ((profit - yesterdayProfit) / yesterdayProfit) * 100;

    const newStats = [
      {
        title: "Today's Revenue",
        value: `Rp ${todaysRevenue.toFixed(2)}`,
        description: `${revenueChange >= 0 ? '+' : ''}${revenueChange.toFixed(1)}% from yesterday`,
        icon: <DollarSign className="w-4 h-4 text-muted-foreground" />,
      },
      {
        title: "Today's Expenses",
        value: `Rp ${todaysExpenses.toFixed(2)}`,
        description: `${expenseChange >= 0 ? '+' : ''}${expenseChange.toFixed(1)}% from yesterday`,
        icon: <TrendingDown className="w-4 h-4 text-muted-foreground" />,
      },
      {
        title: "Profit",
        value: `Rp ${profit.toFixed(2)}`,
        description: `${profitChange >= 0 ? '+' : ''}${profitChange.toFixed(1)}% from yesterday`,
        icon: <TrendingUp className="w-4 h-4 text-muted-foreground" />,
      },
      {
        title: "Items in Stock",
        value: inventory.length.toString(),
        description: `${inventory.length} ingredients available`,
        icon: <Package className="w-4 h-4 text-muted-foreground" />,
      },
    ];
    setStats(newStats);
  }, [transactions, inventory]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats ? (
          stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
            />
          ))
        ) : (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6">
        <RevenueChart transactions={transactions} />
      </div>
    </div>
  );
}
