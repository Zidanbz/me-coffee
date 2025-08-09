
"use client";

import type { ReactNode } from 'react';
import StatCard from '@/components/dashboard/stat-card';
import type { ClientTransaction } from '@/types';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

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
  stats: Stat[];
  transactions: ClientTransaction[];
};

export default function DashboardClient({ stats, transactions }: DashboardClientProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6">
        <RevenueChart transactions={transactions} />
      </div>
    </div>
  );
}
