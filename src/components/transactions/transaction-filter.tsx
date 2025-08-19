
"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';

type TransactionFilterProps = {
  availableYears: number[];
};

export default function TransactionFilter({ availableYears }: TransactionFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentYear = searchParams.get('year') || new Date().getFullYear().toString();
  const currentMonth = searchParams.get('month') || (new Date().getMonth() + 1).toString();

  const handleFilterChange = (key: 'year' | 'month', value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(key, value);
    // Ensure both year and month are present if one is set
    if (!newSearchParams.has('year')) {
      newSearchParams.set('year', new Date().getFullYear().toString());
    }
    if (!newSearchParams.has('month')) {
      newSearchParams.set('month', (new Date().getMonth() + 1).toString());
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleClearFilters = () => {
    router.push(pathname);
  };


  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', 'label': 'September' },
    { value: '10', 'label': 'October' },
    { value: '11', 'label': 'November' },
    { value: '12', 'label': 'December' },
  ];

  return (
    <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      <div className="flex gap-2">
        <Select value={currentMonth} onValueChange={(value) => handleFilterChange('month', value)}>
            <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
                {months.map(month => (
                    <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>

        <Select value={currentYear} onValueChange={(value) => handleFilterChange('year', value)}>
            <SelectTrigger className="w-full md:w-[120px]">
                <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
                {availableYears.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>
       {(searchParams.get('year') || searchParams.get('month')) && (
         <Button variant="ghost" onClick={handleClearFilters}>
            Clear Filter
        </Button>
      )}
    </div>
  );
}
