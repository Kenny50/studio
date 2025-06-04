
'use server';

/**
 * @fileOverview SEO optimizer for markdown content.
 *
 * - optimizeCaseStudySeo - A function that optimizes markdown content SEO.
 * - OptimizeCaseStudySeoInput - The input type for the optimizeCaseStudySeo function.
 * - OptimizeCaseStudySeoOutput - The return type for the optimizeCaseStudySeo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeCaseStudySeoInputSchema = z.object({
  caseStudyContent: z.string().describe('The markdown content to be optimized.'), // Changed description
  targetRegions: z.string().describe('Comma-separated list of target regions/countries for SEO optimization.'),
});
export type OptimizeCaseStudySeoInput = z.infer<typeof OptimizeCaseStudySeoInputSchema>;

const OptimizeCaseStudySeoOutputSchema = z.object({
  titleSuggestion: z.string().describe('Suggested SEO-optimized title for the content.'),
  metaDescriptionSuggestion: z.string().describe('Suggested SEO-optimized meta description for the content.'),
  semanticHtmlSuggestions: z.string().describe('Suggested semantic HTML tags to improve SEO for the content.'),
});
export type OptimizeCaseStudySeoOutput = z.infer<typeof OptimizeCaseStudySeoOutputSchema>;

export async function optimizeCaseStudySeo(input: OptimizeCaseStudySeoInput): Promise<OptimizeCaseStudySeoOutput> {
  return optimizeCaseStudySeoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeMarkdownSeoPrompt', // Renamed for clarity, though not strictly necessary for functionality
  input: {schema: OptimizeCaseStudySeoInputSchema},
  output: {schema: OptimizeCaseStudySeoOutputSchema},
  prompt: `You are an SEO expert specializing in optimizing markdown content for better search engine rankings.

  Analyze the provided markdown content and suggest improvements for:
  - Title: A concise and engaging title that includes relevant keywords.
  - Meta Description: A brief summary that entices users to click on the search result.
  - Semantic HTML Tags: Recommendations for using appropriate HTML5 tags to structure the content for search engines.

  Optimize the content for the following target regions: {{{targetRegions}}}.

  Markdown Content:
  {{{caseStudyContent}}}`, // Kept caseStudyContent Handlebars key to match schema
});

const optimizeCaseStudySeoFlow = ai.defineFlow(
  {
    name: 'optimizeMarkdownSeoFlow', // Renamed for clarity
    inputSchema: OptimizeCaseStudySeoInputSchema,
    outputSchema: OptimizeCaseStudySeoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
