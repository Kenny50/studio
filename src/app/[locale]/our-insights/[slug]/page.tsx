
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PageContainer from '@/components/shared/PageContainer';
import { getArticleBySlug } from '@/lib/insights'; // Updated import
import ArticleDisplay from '@/components/features/insights/ArticleDisplay';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, Edit3, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getI18n } from '@/locales/server';

interface ArticlePageProps {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const t = await getI18n(params.locale);
  const article = await getArticleBySlug(params.slug, params.locale); 
  if (!article) {
    return {
      title: t('article_page.article_not_found_title'),
    };
  }
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
        title: article.title,
        description: article.summary,
        images: [
            {
                url: article.imageUrl, 
                width: 1200, 
                height: 630, 
                alt: article.title,
            },
        ],
        type: 'article',
        authors: [article.author.name],
        publishedTime: article.date,
        tags: article.tags,
    },
    twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.summary,
        images: [article.imageUrl], 
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug, params.locale);
  const t = await getI18n(params.locale); 

  if (!article) {
    notFound();
  }

  // Determine date locale for formatting
  const dateLocaleForFormatting = params.locale === 'zh' ? 'zh-CN' : 
                                 params.locale === 'en' ? 'en-US' : 
                                 'default'; // Fallback if needed

  return (
    <PageContainer className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/our-insights"> 
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t('insights_page.back_to_insights')}
          </Link>
        </Button>
      </div>
      <article className="space-y-8">
        <header className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="default" className="text-sm">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">{article.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                {article.author.avatarUrl && <AvatarImage src={article.author.avatarUrl} alt={article.author.name} data-ai-hint={article.author.avatarAiHint}/>}
                <AvatarFallback>{article.author.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{article.author.name}</p>
                <p className="text-xs flex items-center">
                    <Edit3 className="h-3 w-3 mr-1.5" /> {t('article_page.published')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4" />
              <span>{new Date(article.date).toLocaleDateString(dateLocaleForFormatting, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </header>

        {article.imageUrl && (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg my-8">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={article.imageAiHint}
              priority
            />
          </div>
        )}
        
        <ArticleDisplay markdownContent={article.contentMarkdown} />

      </article>
    </PageContainer>
  );
}
