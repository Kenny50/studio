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

const formSchema = z.object({
  caseStudyContent: z.string().min(100, { message: "Case study content must be at least 100 characters." }),
  targetRegions: z.string().min(2, { message: "Please specify at least one target region." }),
});

interface SeoOptimizerFormProps {
  initialContent?: string;
}

export default function SeoOptimizerForm({ initialContent = '' }: SeoOptimizerFormProps) {
  const [isPending, startTransition] = useTransition();
  const [seoSuggestions, setSeoSuggestions] = useState<OptimizeCaseStudySeoOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caseStudyContent: initialContent,
      targetRegions: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        setSeoSuggestions(null); // Clear previous suggestions
        const input: OptimizeCaseStudySeoInput = {
          caseStudyContent: values.caseStudyContent,
          targetRegions: values.targetRegions,
        };
        const result = await optimizeCaseStudySeo(input);
        setSeoSuggestions(result);
        toast({
          title: "SEO Suggestions Generated!",
          description: "Review the suggestions below to optimize your content.",
          variant: "default",
        });
      } catch (error) {
        console.error("Error optimizing SEO:", error);
        toast({
          title: "Error",
          description: "Failed to generate SEO suggestions. Please try again.",
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
            name="caseStudyContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Case Study Content (Markdown)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your case study content here in Markdown format..."
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
                <FormLabel className="text-lg font-semibold">Target Regions/Countries</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., USA, Canada, UK"
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
                Optimizing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate SEO Suggestions
              </>
            )}
          </Button>
        </form>
      </Form>

      {seoSuggestions && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2"><Sparkles className="text-accent h-6 w-6" /> SEO Optimization Suggestions</CardTitle>
            <CardDescription>
              Review these AI-generated suggestions to improve your case study's visibility.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Suggested Title:</h3>
              <p className="p-3 bg-muted rounded-md text-muted-foreground">{seoSuggestions.titleSuggestion}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Suggested Meta Description:</h3>
              <p className="p-3 bg-muted rounded-md text-muted-foreground">{seoSuggestions.metaDescriptionSuggestion}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Semantic HTML Suggestions:</h3>
              <div className="p-3 bg-muted rounded-md text-muted-foreground whitespace-pre-wrap">{seoSuggestions.semanticHtmlSuggestions}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
