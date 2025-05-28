
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/lib/insights-data.en'; // Ensure this type is correct
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useI18n } from '@/locales/client'; // Or getI18n if this becomes a server component

interface ArticleCardProps {
  article: Article;
  locale: string; // Added locale prop
}

export default function ArticleCard({ article, locale }: ArticleCardProps) {
  // const t = useI18n(); // If button text or other UI elements here need translation via client hook

  // Determine date locale for formatting
  const dateLocaleForFormatting = locale === 'zh' ? 'zh-CN' : 
                                 locale === 'en' ? 'en-US' : 
                                 'default'; // Fallback

  return (
    <Link href={`/our-insights/${article.slug}`} className="block h-full group">
      <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full h-48 md:h-56 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint={article.imageAiHint}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader>
            <CardTitle className="text-xl mb-1 group-hover:underline">{article.title}</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Avatar className="h-6 w-6">
              {article.author.avatarUrl && <AvatarImage src={article.author.avatarUrl} alt={article.author.name} data-ai-hint={article.author.avatarAiHint} />}
              <AvatarFallback>
                {article.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span>{article.author.name}</span>
            <span className="mx-1">·</span>
            <CalendarDays className="h-3 w-3" />
            <span>{new Date(article.date).toLocaleDateString(dateLocaleForFormatting, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription>{article.summary}</CardDescription>
        </CardContent>
        <CardFooter>
          {/* The button text "Read Article" could be fetched using useI18n if this remains a client component,
              or passed as a prop if it becomes a server component and needs dynamic text.
              For now, assuming 'insights_page.read_article_button' key exists and this component uses it,
              or the parent page passes the translated string.
              If the button text is static or handled by parent's i18n, it's fine.
              If this component needs its own t() for the button, it must be client or pass t down.
          */}
          <Button variant="outline" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground pointer-events-none">
            {/* TODO: Properly translate this if not handled by a global t() or passed prop */}
            Read Article <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

