
import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import SeoOptimizerForm from '@/components/features/seo/SeoOptimizerForm';
import { getI18n, setStaticParamsLocale } from '@/locales/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    setStaticParamsLocale(locale);
    const t = await getI18n();
    return {
        title: t('seo_optimizer_page.meta_title'),
        description: t('seo_optimizer_page.meta_description'),
    };
}

export default async function SeoOptimizerPage({ params: { locale } }: { params: { locale: string } }) {
    setStaticParamsLocale(locale);
    const t = await getI18n();
    return (
        <PageContainer>
            <section className="text-center py-12 md:py-16">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('seo_optimizer_page.title')}</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    {t('seo_optimizer_page.subtitle')}
                </p>
            </section>

            <section className="py-8">
                <SeoOptimizerForm />
            </section>
        </PageContainer>
    );
}
