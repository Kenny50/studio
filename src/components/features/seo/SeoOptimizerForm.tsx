"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { optimizeCaseStudySeo, OptimizeCaseStudySeoInput, OptimizeCaseStudySeoOutput } from '@/ai/flows/optimize-case-study-seo';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/locales/client'; // Import useI18n

// Form schema using translation keys for error messages
const getFormSchema = (t: Function) => z.object({
  markdownContent: z.string().min(100, { message: t('seo_optimizer_page.content_error') }),
  targetRegions: z.string().min(2, { message: t('seo_optimizer_page.regions_error') }),
});


interface SeoOptimizerFormProps {
  initialContent?: string;
}

export default function SeoOptimizerForm({ initialContent = '' }: SeoOptimizerFormProps) {
  const t = useI18n(); // Initialize useI18n
  const formSchema = getFormSchema(t); // Get schema with translated messages

  const [isPending, startTransition] = useTransition();
  const [seoSuggestions, setSeoSuggestions] = useState<OptimizeCaseStudySeoOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      markdownContent: initialContent,
      targetRegions: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        setSeoSuggestions(null); // Clear previous suggestions
        const input: OptimizeCaseStudySeoInput = {
          caseStudyContent: values.markdownContent, // Schema name matches API
          targetRegions: values.targetRegions,
        };
        const result = await optimizeCaseStudySeo(input);
        setSeoSuggestions(result);
        toast({
          title: t('seo_optimizer_page.suggestions_title'), // Using t for toast
          description: t('seo_optimizer_page.suggestions_description'),
          variant: "default",
        });
      } catch (error) {
        console.error("Error optimizing SEO:", error);
        toast({
          title: t('contact_form.error_title'), // Re-use generic error title
          description: t('contact_form.error_description'), // Re-use generic error description
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="markdownContent" // Keep name as "markdownContent" for schema mapping
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">{t('seo_optimizer_page.content_label')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('seo_optimizer_page.content_placeholder')}
                    {...field}
                    rows={15}
                    className="border-input focus:border-primary focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetRegions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">{t('seo_optimizer_page.regions_label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('seo_optimizer_page.regions_placeholder')}
                    {...field}
                    className="border-input focus:border-primary focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('seo_optimizer_page.button_loading_text')}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                {t('seo_optimizer_page.button_text')}
              </>
            )}
          </Button>
        </form>
      </Form>

      {seoSuggestions && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2"><Sparkles className="text-accent h-6 w-6" /> {t('seo_optimizer_page.suggestions_title')}</CardTitle>
            <CardDescription>
              {t('seo_optimizer_page.suggestions_description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">{t('seo_optimizer_page.suggested_title_label')}</h3>
              <p className="p-3 bg-muted rounded-md text-muted-foreground">{seoSuggestions.titleSuggestion}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{t('seo_optimizer_page.suggested_meta_description_label')}</h3>
              <p className="p-3 bg-muted rounded-md text-muted-foreground">{seoSuggestions.metaDescriptionSuggestion}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{t('seo_optimizer_page.suggested_html_label')}</h3>
              <div className="p-3 bg-muted rounded-md text-muted-foreground whitespace-pre-wrap">{seoSuggestions.semanticHtmlSuggestions}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
