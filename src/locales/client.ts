
'use client'; // Add this directive

import { createI18nClient } from 'next-international/client';

export const { useI18n, useScopedI18n, I18nProviderClient, useCurrentLocale, useChangeLocale } = createI18nClient({
    en: () => import('./en'),
    zh: () => import('./zh'),
});
