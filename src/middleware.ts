
import { createI18nMiddleware } from 'next-international/middleware';
import type { NextRequest } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
});

export function middleware(request: NextRequest) {
    return I18nMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)'], // Added 'assets' to ignore static assets
};
