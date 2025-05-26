
"use client"; // Make it a client component to use useI18n hook

import Link from 'next/link';
import { ShipIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useI18n, useCurrentLocale } from '@/locales/client';
import { useParams } from 'next/navigation'; // To get locale for links if needed, though next-international handles relative links

export default function Header() {
  const t = useI18n();
  const currentLocale = useCurrentLocale(); // or useParams().locale
  // const params = useParams();
  // const currentLocale = params.locale as string || 'en';


  const navItems = [
    { labelKey: 'header.home', href: '/' },
    { labelKey: 'header.about_us', href: '/about' },
    { labelKey: 'header.services', href: '/services' },
    { labelKey: 'header.portfolio', href: '/portfolio' },
    { labelKey: 'header.transformation_guide', href: '/transformation-guide' },
    { labelKey: 'header.our_insights', href: '/our-insights' },
    { labelKey: 'header.contact_us', href: '/contact' },
  ];

  // Basic locale switcher (example, can be improved)
  const otherLocale = currentLocale === 'en' ? 'zh' : 'en';
  const otherLocaleLabel = currentLocale === 'en' ? '中文' : 'English';


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <ShipIcon className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">{t('company_name')}</span>
        </Link>
        <nav className="hidden md:flex gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.labelKey}
              href={item.href} // next-international handles prefixing for relative links with middleware
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t(item.labelKey as any)}
            </Link>
          ))}
          <Button variant="ghost" size="sm" asChild>
            <Link href={otherLocale} locale={otherLocale}>
              {otherLocaleLabel}
            </Link>
          </Button>
        </nav>
        <div className="md:hidden flex items-center">
           <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href={otherLocale} locale={otherLocale}>
              {otherLocaleLabel}
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <ShipIcon className="h-7 w-7 text-primary" />
                   <span className="text-xl font-bold text-foreground">{t('company_name')}</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.labelKey}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t(item.labelKey as any)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
