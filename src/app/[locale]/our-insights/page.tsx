
import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import ArticleCard from '@/components/features/insights/ArticleCard';
import { articlesData } from '@/lib/insights-data'; // Assuming this data is not yet localized
import { BookOpenText, Mail } from 'lucide-react';
import NewsletterSubscribeForm from '@/components/features/newsletter/NewsletterSubscribeForm';
// import { getI18n } from '@/locales/server'; // For UI strings

// TODO: Localize metadata
// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
//   const t = await getI18n(locale);
//   return {
//     title: t('insights_page.meta_title'),
//     description: t('insights_page.meta_description'),
//   };
// }

export const metadata: Metadata = {
  title: 'Our Insights',
  description: 'Explore articles, thoughts, and expertise from the Ciaodigi Navigator team on technology, digital transformation, and industry trends.',
};

export default async function OurInsightsPage({ params: { locale } }: { params: { locale: string }}) {
  // const t = await getI18n(locale);

  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
          <BookOpenText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Insights {/* TODO: t('insights_page.title') */}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Dive into our collection of articles where we share our knowledge, perspectives, and the latest trends in the digital world. {/* TODO: t('insights_page.subtitle') */}
        </p>
      </section>

      <section className="py-8">
        {articlesData.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesData.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg py-12">
            We're busy crafting insightful content. Check back soon for our latest articles! {/* TODO: t('insights_page.no_articles') */}
          </p>
        )}
      </section>

      <section className="py-16 md:py-24 bg-secondary/20 rounded-lg mt-12 shadow-inner">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
           <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
             <Mail className="h-10 w-10 text-primary" />
           </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Newsletter {/* TODO: t('insights_page.newsletter_title') */}</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get the latest articles, news, and insights from Ciaodigi Navigator delivered straight to your inbox. Don't miss out! {/* TODO: t('insights_page.newsletter_description') */}
          </p>
          {/* NewsletterSubscribeForm will use its own translations via useI18n */}
          <NewsletterSubscribeForm />
        </div>
      </section>
    </PageContainer>
  );
}
