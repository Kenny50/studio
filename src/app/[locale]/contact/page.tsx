
import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import ContactForm from '@/components/features/contact/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone, Linkedin, Twitter, Github } from 'lucide-react';
import Link from 'next/link';
import { getI18n, setStaticParamsLocale } from '@/locales/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    setStaticParamsLocale(locale);
    const t = await getI18n();
    return {
        title: t('contact_page.meta_title'),
        description: t('contact_page.meta_description'),
    };
}


export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
    setStaticParamsLocale(locale);
    const t = await getI18n();
    return (
        <PageContainer>
            <section className="text-center py-12 md:py-16">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('contact_page.page_title')}</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    {t('contact_page.subtitle')}
                </p>
            </section>

            <section className="py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl">{t('contact_page.send_message_card_title')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ContactForm />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>{t('contact_page.contact_info_card_title')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <a href="mailto:ciaodigi@gmail.com" className="text-muted-foreground hover:text-primary">
                                    ciaodigi@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary" />
                                <a href="tel:+886936965814" className="text-muted-foreground hover:text-primary">
                                    +886 936965814
                                </a>
                            </div>
                            {/* <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <p className="text-muted-foreground">
                  {t('contact_page.address')}
                </p>
              </div> */}
                        </CardContent>
                    </Card>

                    {/* <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t('contact_page.connect_with_us_card_title')}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Link href="#" aria-label={t('footer.social_media.twitter')} className="p-2 rounded-md bg-secondary hover:bg-primary/20 text-primary">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label={t('footer.social_media.linkedin')} className="p-2 rounded-md bg-secondary hover:bg-primary/20 text-primary">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label={t('footer.social_media.github')} className="p-2 rounded-md bg-secondary hover:bg-primary/20 text-primary">
                <Github className="h-6 w-6" />
              </Link>
            </CardContent>
          </Card> */}
                </div>
            </section>
        </PageContainer>
    );
}
