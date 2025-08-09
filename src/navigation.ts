import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';
 
export const locales = ['en', 'id'] as const;
export const localePrefix = 'always'; // Default
 
// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same path, use
  // the special `/` key.
  '/': '/',
 
  // If locales use different paths, specify
  // them separately for each locale.
  '/dashboard': {
    en: '/dashboard',
    id: '/dasbor'
  },
  '/transactions': {
    en: '/transactions',
    id: '/transaksi'
  },
  '/hpp': {
    en: '/hpp',
    id: '/hpp'
  },
  '/user-guide': {
    en: '/user-guide',
    id: '/panduan-pengguna'
  }
} satisfies Pathnames<typeof locales>;
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});