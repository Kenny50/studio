
import { createI18nServer, setStaticParamsLocale as setStaticParamsLocaleNextInternational } from 'next-international/server';

export const { getI18n, getScopedI18n, getCurrentLocale, getStaticParams } = createI18nServer({
  en: () => import('./en'),
  zh: () => import('./zh'),
});

// Re-export setStaticParamsLocale so it can be imported from '@/locales/server'
export const setStaticParamsLocale = setStaticParamsLocaleNextInternational;
