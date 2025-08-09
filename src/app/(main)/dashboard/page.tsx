import StatCard from '@/components/dashboard/stat-card';
import RevenueChart from '@/components/dashboard/revenue-chart';
import { TrendingUp, TrendingDown, Package, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Revenue"
          value="$1,250.00"
          description="+20.1% from yesterday"
          icon={<DollarSign className="w-4 h-4 text-muted-foreground" />}
        />
        <StatCard
          title="Today's Expenses"
          value="$430.50"
          description="-5.2% from yesterday"
          icon={<TrendingDown className="w-4 h-4 text-muted-foreground" />}
        />
        <StatCard
          title="Profit"
          value="$819.50"
          description="+15% from yesterday"
          icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
        />
        <StatCard
          title="Items in Stock"
          value="12"
          description="3 items are running low"
          icon={<Package className="w-4 h-4 text-muted-foreground" />}
        />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <RevenueChart />
      </div>
    </div>
  );
}
