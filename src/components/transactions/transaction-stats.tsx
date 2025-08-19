
"use client";

import StatCard from '@/components/dashboard/stat-card';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

type TransactionStatsProps = {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

export default function TransactionStats({ totalIncome, totalExpenses, balance }: TransactionStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Income"
        value={formatCurrency(totalIncome)}
        icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
        description="All income recorded"
      />
      <StatCard
        title="Total Expenses"
        value={formatCurrency(totalExpenses)}
        icon={<TrendingDown className="w-4 h-4 text-muted-foreground" />}
        description="All expenses recorded"
      />
      <StatCard
        title="Balance"
        value={formatCurrency(balance)}
        icon={<DollarSign className="w-4 h-4 text-muted-foreground" />}
        description="Income - Expenses"
      />
    </div>
  );
}
