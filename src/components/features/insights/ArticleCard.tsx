import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/lib/insights-data';
import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <Link href={`/our-insights/${article.slug}`} className="block">
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
      </Link>
      <CardHeader>
        <Link href={`/our-insights/${article.slug}`} className="hover:underline">
          <CardTitle className="text-xl mb-1">{article.title}</CardTitle>
        </Link>
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
          <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
        <Button asChild variant="outline" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/our-insights/${article.slug}`}>
            Read Article <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
