import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import SeoOptimizerForm from '@/components/features/seo/SeoOptimizerForm';

export const metadata: Metadata = {
  title: 'SEO Optimizer Tool',
  description: 'Enhance your markdown content for better search engine visibility with our AI-powered SEO tool.',
};

export default function SeoOptimizerPage() {
  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">AI-Powered SEO Optimizer</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Leverage generative AI to enhance your markdown case studies or articles. Get suggestions for titles, meta descriptions, and semantic HTML tags to boost your organic visibility.
        </p>
      </section>

      <section className="py-8">
        <SeoOptimizerForm />
      </section>
    </PageContainer>
  );
}
