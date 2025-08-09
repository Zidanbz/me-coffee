
import type { ReactNode } from 'react';
import MainLayoutContent from './layout-client';

export default function MainLayout({ children }: { children: ReactNode }) {
  return <MainLayoutContent>{children}</MainLayoutContent>;
}
