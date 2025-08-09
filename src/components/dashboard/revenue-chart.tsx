
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";
import type { ClientTransaction } from "@/types";
import { subDays, format } from 'date-fns';

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--primary))",
  },
}

function CustomBarChart({ data, dataKey, xDataKey }: { data: any[], dataKey: string, xDataKey: string }) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <XAxis dataKey={xDataKey} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rp${value}`} />
          <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Bar dataKey={dataKey} fill="var(--color-income)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default function RevenueChart({ transactions }: { transactions: ClientTransaction[] }) {
  const now = new Date();

  // Daily
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(now, 6 - i);
    const dayIncome = transactions
      .filter(t => {
        if (!t.date) return false;
        const transactionDate = new Date(t.date);
        return t.type === 'income' && format(transactionDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      })
      .reduce((sum, t) => sum + t.amount, 0);
    return { date: format(date, 'EEE'), income: dayIncome };
  });

  // Weekly
  const weeklyData = Array.from({ length: 4 }, (_, i) => {
    const weekEnd = subDays(now, (3 - i) * 7);
    const weekStart = subDays(weekEnd, 7);
    const weekIncome = transactions
      .filter(t => {
          if (!t.date) return false;
          const transactionDate = new Date(t.date);
          return t.type === 'income' && transactionDate >= weekStart && transactionDate < weekEnd;
      })
      .reduce((sum, t) => sum + t.amount, 0);
    return { week: `Week ${i + 1}`, income: weekIncome };
  });

  // Monthly
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const month = (now.getMonth() - (5 - i) + 12) % 12;
    const year = now.getFullYear() - (now.getMonth() < 5 - i ? 1 : 0);
    const monthIncome = transactions
      .filter(t => {
        if (!t.date) return false;
        const transactionDate = new Date(t.date);
        return t.type === 'income' && transactionDate.getMonth() === month && transactionDate.getFullYear() === year
      })
      .reduce((sum, t) => sum + t.amount, 0);
    return { month: format(new Date(year, month), 'MMM'), income: monthIncome };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Revenue Overview</CardTitle>
        <CardDescription>Track your income over different periods.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <CustomBarChart data={dailyData} dataKey="income" xDataKey="date" />
          </TabsContent>
          <TabsContent value="weekly">
            <CustomBarChart data={weeklyData} dataKey="income" xDataKey="week" />
          </TabsContent>
          <TabsContent value="monthly">
            <CustomBarChart data={monthlyData} dataKey="income" xDataKey="month" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
