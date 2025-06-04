
import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import ArticleCard from '@/components/features/insights/ArticleCard';
import { getAllArticles } from '@/lib/insights'; 
import { BookOpenText, Mail } from 'lucide-react';
import NewsletterSubscribeForm from '@/components/features/newsletter/NewsletterSubscribeForm';
import { getI18n, setStaticParamsLocale } from '@/locales/server'; 

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  setStaticParamsLocale(locale);
  const t = await getI18n(locale);
  return {
    title: t('insights_page.meta_title'),
    description: t('insights_page.meta_description'),
  };
}

export default async function OurInsightsPage({ params: { locale } }: { params: { locale: string }}) {
  setStaticParamsLocale(locale);
  const t = await getI18n(locale);
  const articles = await getAllArticles(locale); 

  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
          <BookOpenText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('insights_page.page_title')}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('insights_page.subtitle')}
        </p>
      </section>

      <section className="py-8">
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg py-12">
            {t('insights_page.no_articles')}
          </p>
        )}
      </section>

      <section className="py-16 md:py-24 bg-secondary/20 rounded-lg mt-12 shadow-inner">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
           <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
             <Mail className="h-10 w-10 text-primary" />
           </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('insights_page.newsletter_title')}</h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('insights_page.newsletter_description')}
          </p>
          <NewsletterSubscribeForm />
        </div>
      </section>
    </PageContainer>
  );
}
