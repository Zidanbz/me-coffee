
"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TransactionFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [year, setYear] = useState(() => searchParams.get('year') || new Date().getFullYear().toString());
  const [month, setMonth] = useState(() => searchParams.get('month') || (new Date().getMonth() + 1).toString());

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams);
      for (const [key, value] of Object.entries(params)) {
        newSearchParams.set(key, value);
      }
      return newSearchParams.toString();
    },
    [searchParams]
  );
  
  useEffect(() => {
    // Update year/month from searchParams if they change
    const yearFromParams = searchParams.get('year');
    const monthFromParams = searchParams.get('month');
    if (yearFromParams) setYear(yearFromParams);
    if (monthFromParams) setMonth(monthFromParams);
  }, [searchParams])


  const handleFilterChange = (newYear: string, newMonth: string) => {
    setYear(newYear);
    setMonth(newMonth);
    router.push(pathname + '?' + createQueryString({ year: newYear, month: newMonth }));
  };

  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: new Date(0, i).toLocaleString('default', { month: 'long' }),
  }));

  return (
    <div className="flex items-center gap-2">
      <Select value={month} onValueChange={(newMonth) => handleFilterChange(year, newMonth)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map(m => (
            <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={year} onValueChange={(newYear) => handleFilterChange(newYear, month)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map(y => (
            <SelectItem key={y} value={y}>{y}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
