
import type { ReactNode } from 'react';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import MainLayoutContent from './layout-client';

export default async function MainLayout({ children, params: { locale } }: { children: ReactNode, params: { locale: string } }) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MainLayoutContent>{children}</MainLayoutContent>
    </NextIntlClientProvider>
  );
}
