"use client";

import type { ReactNode } from 'react';
import Link from 'next-intl/link';
import { usePathname } from 'next-intl/client';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarOverlay } from '@/components/ui/sidebar';
import { Coffee, LayoutDashboard, ArrowLeftRight, Calculator, BookUser, Globe } from 'lucide-react';
import BottomNav from '@/components/layout/bottom-nav';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';


function HeaderTitle() {
  const { isCollapsed } = useSidebar();
  const isMobile = useIsMobile();
  const t = useTranslations('Header');

  return (
     <div className={cn("flex items-center gap-2", (isCollapsed || isMobile) && "justify-center")}>
        <Coffee className="h-8 w-8 text-sidebar-foreground" />
        {(!isCollapsed && !isMobile) && <h1 className="text-xl font-bold text-sidebar-foreground font-headline flex-1">{t('title')}</h1>}
    </div>
  )
}


export default function MainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar>
          <SidebarHeader>
            <HeaderTitle />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={t('Sidebar.dashboard')}>
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span className="flex-1">{t('Sidebar.dashboard')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={t('Sidebar.transactions')}>
                  <Link href="/transactions">
                    <ArrowLeftRight />
                    <span className="flex-1">{t('Sidebar.transactions')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={t('Sidebar.hpp')}>
                  <Link href="/hpp">
                    <Calculator />
                    <span className="flex-1">{t('Sidebar.hpp')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={t('Sidebar.userGuide')}>
                  <Link href="/user-guide">
                    <BookUser />
                    <span className="flex-1">{t('Sidebar.userGuide')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <SidebarOverlay />
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="flex-1" />
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Change Language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('Header.language')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={pathname} locale="id" >
                  <DropdownMenuItem>
                    Indonesia
                  </DropdownMenuItem>
                </Link>
                <Link href={pathname} locale="en" >
                  <DropdownMenuItem>
                    English
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person portrait" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('Header.myAccount')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t('Header.settings')}</DropdownMenuItem>
                <DropdownMenuItem>{t('Header.support')}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t('Header.logout')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-4 overflow-auto md:p-6 pb-20 md:pb-6">
            {children}
          </main>
          <BottomNav />
        </div>
      </div>
    </SidebarProvider>
  );
}
