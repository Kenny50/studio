import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import ArticleCard from '@/components/features/insights/ArticleCard';
import { articlesData } from '@/lib/insights-data';
import { BookOpenText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Insights',
  description: 'Explore articles, thoughts, and expertise from the Ciaodigi Navigator team on technology, digital transformation, and industry trends.',
};

export default function OurInsightsPage() {
  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
          <BookOpenText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Insights</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Dive into our collection of articles where we share our knowledge, perspectives, and the latest trends in the digital world.
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
            We're busy crafting insightful content. Check back soon for our latest articles!
          </p>
        )}
      </section>
    </PageContainer>
  );
}
