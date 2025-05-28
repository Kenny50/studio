
import { articlesDataEn, type Article, type Author } from './insights-data.en';
import { articlesDataZh } from './insights-data.zh';

// This function simulates fetching all articles based on locale.
// In a real app, this might be an API call or a more complex data fetching mechanism.
export async function getAllArticles(locale: string): Promise<Article[]> {
  if (locale === 'zh') {
    return articlesDataZh;
  }
  // Default to English
  return articlesDataEn;
}

// This function simulates fetching a single article by slug and locale.
export async function getArticleBySlug(slug: string, locale: string): Promise<Article | undefined> {
  const articles = await getAllArticles(locale);
  return articles.find(article => article.slug === slug);
}
