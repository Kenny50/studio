
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Noto_Sans_SC } from 'next/font/google';
import '../globals.css'; // Use relative path to access globals.css from the parent directory
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { I18nProviderClient } from '@/locales/client';
import { getStaticParams } from '@/locales/server';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
    display: 'swap',
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
    display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
    variable: '--font-noto-sans-sc',
    subsets: ['latin'], // Removed 'chinese-simplified'
    weight: ['400', '700'], // Specify weights you need
    display: 'swap',
});

// generateStaticParams is recommended for static site generation if you list all locales
export function generateStaticParams() {
    return getStaticParams();
}


// Viewport settings (optional, but good for consistency)
export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};


export default function LocaleLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    return (
        <html lang={locale} className="h-full">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} antialiased flex flex-col min-h-screen bg-background`}
            >
                <I18nProviderClient locale={locale}>
                    <Header />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                    <Toaster />
                </I18nProviderClient>
            </body>
        </html>
    );
}

// Note: The top-level metadata from src/app/layout.tsx will be the default.
// If you want to provide specific default metadata for all locales,
// you can define a generateMetadata function here too.
// For page-specific metadata, define it in each page.tsx.
// Example for locale-specific default title template:
/*
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  // Optionally, load base translations if needed for default titles/descriptions
  // const t = await getI18n();
  return {
    title: {
      default: 'Ciaodigi Navigator', // Default title for this locale
      template: `%s | Ciaodigi Navigator (${locale.toUpperCase()})`, // Title template for this locale
    },
    description: 'Your partner in digital transformation and custom software solutions.', // Default description
  };
}
*/
