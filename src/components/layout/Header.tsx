
"use client"; // Make it a client component to use useI18n hook

import Link from 'next/link';
import { ShipIcon, Menu, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useI18n, useCurrentLocale, useChangeLocale } from '@/locales/client';
import { cn } from '@/lib/utils';

export default function Header() {
    const t = useI18n();
    const currentLocale = useCurrentLocale();


    const navItems = [
        { labelKey: 'header.home', href: '/' },
        { labelKey: 'header.about_us', href: '/about' },
        { labelKey: 'header.services', href: '/services' },
        { labelKey: 'header.transformation_guide', href: '/transformation-guide' },
        { labelKey: 'header.our_insights', href: '/our-insights' },
        { labelKey: 'header.contact_us', href: '/contact' },
    ];

    const locales = [
        { code: 'en', label: t('header.language_english') },
        { code: 'zh', label: t('header.language_mandarin') },
    ];

    const changeLocale = useChangeLocale()

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
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors",
                                item.labelKey === 'header.our_insights'
                                    ? "text-primary font-bold hover:text-primary/80"
                                    : "text-muted-foreground hover:text-primary"
                            )}
                        >
                            {t(item.labelKey as any)}
                        </Link>
                    ))}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label={t('header.switch_language_aria_label')}>
                                <Languages className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {locales.map((locale) => (
                                <DropdownMenuItem key={locale.code} onClick={() => changeLocale(locale.code)}>
                                    <span className={currentLocale === locale.code ? 'font-semibold' : ''}>
                                        {locale.label}
                                    </span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
                <div className="md:hidden flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2" aria-label={t('header.switch_language_aria_label')}>
                                <Languages className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {locales.map((locale) => (
                                <DropdownMenuItem key={locale.code} onClick={() => changeLocale(locale.code)}>
                                    <span className={currentLocale === locale.code ? 'font-semibold' : ''}>
                                        {locale.label}
                                    </span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">{t('header.toggle_navigation_sr_label')}</span>
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
                                        className={cn(
                                            "transition-colors",
                                            item.labelKey === 'header.our_insights'
                                                ? "text-primary font-bold hover:text-primary/80"
                                                : "text-muted-foreground hover:text-primary"
                                        )}
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
