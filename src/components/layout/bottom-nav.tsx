
"use client";

import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowLeftRight, Calculator, BookUser } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';


export default function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations('BottomNav');

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { href: '/transactions', icon: ArrowLeftRight, label: t('transactions') },
    { href: '/hpp', icon: Calculator, label: t('hpp') },
    { href: '/user-guide', icon: BookUser, label: t('guide') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <nav className="grid h-16 items-center justify-around grid-cols-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary">
              <item.icon className={cn("h-6 w-6", isActive && "text-primary")} />
              <span className={cn("text-xs font-medium", isActive && "text-primary")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
