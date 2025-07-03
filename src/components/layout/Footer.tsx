
"use client"; // Make it a client component to use useI18n hook

import Link from 'next/link';
import Image from 'next/image';
import NewsletterSubscribeForm from '@/components/features/newsletter/NewsletterSubscribeForm';
import { useI18n } from '@/locales/client';

export default function Footer() {
    const t = useI18n();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto py-12 px-4 md:px-6">
                <div className="grid md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-6 lg:col-span-7">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="https://s3.ap-northeast-1.amazonaws.com/ciaodigi.com/logo192.png" // ← Use public path instead of relative import
                                alt="Company Logo"
                                width={32}
                                height={32}
                                unoptimized
                            />
                            <span className="text-xl font-bold text-foreground">{t('company_name')}</span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-6 max-w-md">
                            {t('footer.tagline')}
                        </p>
                        <p className="text-sm text-muted-foreground mb-6 max-w-md">
                            {t('footer.company_information')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {t('footer.copyright', { year: currentYear })}
                        </p>
                    </div>

                    <div className="md:col-span-6 lg:col-span-5">
                        {/* NewsletterSubscribeForm uses its own internal translations via useI18n */}
                        <NewsletterSubscribeForm />
                        {/* <div className="flex md:justify-start gap-4 mt-4">
              <Link href="#" aria-label={t('footer.social_media.twitter')} className="text-muted-foreground hover:text-primary p-2 rounded-md hover:bg-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label={t('footer.social_media.linkedin')} className="text-muted-foreground hover:text-primary p-2 rounded-md hover:bg-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label={t('footer.social_media.github')} className="text-muted-foreground hover:text-primary p-2 rounded-md hover:bg-secondary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
