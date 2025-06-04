
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Lightbulb, Users } from 'lucide-react';
import PageContainer from '@/components/shared/PageContainer';
import Image from 'next/image';
import { getI18n, setStaticParamsLocale } from '@/locales/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  setStaticParamsLocale(locale);
  const t = await getI18n(locale);
  return {
    title: t('home_page.meta_title'),
    description: t('home_page.meta_description'),
  };
}

export default async function Home({ params: { locale } }: { params: { locale: string }}) {
  setStaticParamsLocale(locale);
  const t = await getI18n(locale);

  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 rounded-lg bg-gradient-to-br from-primary/10 via-background to-background shadow-inner">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            {t('home_page.hero_title_part1')}
            <span className="text-primary">{t('home_page.hero_title_highlight')}</span>
            {locale === 'zh' && t('home_page.hero_title_part2')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            {t('home_page.hero_subtitle')}
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contact">{t('home_page.contact_us_button')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">{t('home_page.learn_services_button')}<ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">{t('home_page.core_offerings_title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>{t('home_page.custom_web_dev_title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('home_page.custom_web_dev_desc')}
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
              </div>
              <CardTitle>{t('home_page.mobile_app_solutions_title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('home_page.mobile_app_solutions_desc')}
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>{t('home_page.digital_transformation_title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('home_page.digital_transformation_desc')}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-secondary/30 rounded-lg">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">{t('home_page.why_partner_title')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('home_page.why_partner_desc')}
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{t('home_page.client_centric')}</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{t('home_page.expert_team')}</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{t('home_page.quality_scalability')}</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{t('home_page.transparent_communication')}</span>
              </li>
            </ul>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/about">{t('home_page.learn_more_about_us_button')}</Link>
            </Button>
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=1080"
              alt={t('home_page.why_partner_title')} 
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
