"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

const dailyData = [
  { date: "Mon", income: 250 },
  { date: "Tue", income: 320 },
  { date: "Wed", income: 280 },
  { date: "Thu", income: 450 },
  { date: "Fri", income: 500 },
  { date: "Sat", income: 680 },
  { date: "Sun", income: 620 },
]

const weeklyData = [
  { week: "Week 1", income: 1800 },
  { week: "Week 2", income: 2200 },
  { week: "Week 3", income: 1900 },
  { week: "Week 4", income: 2500 },
]

const monthlyData = [
  { month: "Jan", income: 8000 },
  { month: "Feb", income: 9500 },
  { month: "Mar", income: 11000 },
  { month: "Apr", income: 10500 },
  { month: "May", income: 12000 },
  { month: "Jun", income: 11800 },
]

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
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
          <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Bar dataKey={dataKey} fill="var(--color-income)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default function RevenueChart() {
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
