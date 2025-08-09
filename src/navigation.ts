import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';
 
export const locales = ['en', 'id'] as const;
export const localePrefix = 'always'; // Default
 
// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  '/dashboard': {
    en: '/dashboard',
    id: '/dashboard'
  },
  '/transactions': {
    en: '/transactions',
    id: '/transactions'
  },
  '/hpp': {
    en: '/hpp',
    id: '/hpp'
  },
  '/user-guide': {
    en: '/user-guide',
    id: '/user-guide'
  }
} satisfies Pathnames<typeof locales>;
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});