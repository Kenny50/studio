
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import PageContainer from '@/components/shared/PageContainer';
import { getProjectBySlug } from '@/lib/projects-data'; // Assuming this data is not localized
import CaseStudyDisplay from '@/components/features/portfolio/CaseStudyDisplay';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Briefcase, Settings2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getI18n } from '@/locales/server'; 

interface CaseStudyPageProps {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const t = await getI18n(params.locale);
  const project = getProjectBySlug(params.slug); 
  if (!project) {
    return {
      title: t('case_study_page.case_study_not_found_title'),
    };
  }
  return {
    title: project.title, // TODO: Project title should be localized if content is translated
    description: project.summary, // TODO: Project summary should be localized
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = getProjectBySlug(params.slug);
  const t = await getI18n(params.locale); 

  if (!project) {
    notFound();
  }

  return (
    <PageContainer>
      <article className="space-y-12">
        <header className="text-center py-8 md:py-12 border-b">
          {/* TODO: Localize project title and summary if content is translated */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{project.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{project.summary}</p>
          <div className="mt-6 flex justify-center flex-wrap gap-2">
            {/* TODO: Localize tags if needed */}
            {project.tags.map((tag) => (
              <Badge key={tag} variant="default" className="text-sm">{tag}</Badge>
            ))}
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-8">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image
                src={project.imageUrl}
                alt={project.title} // TODO: Localize alt text
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint={project.imageAiHint}
                priority
              />
            </div>
            {/* TODO: caseStudyMarkdown needs to be localized if content is translated */}
            <CaseStudyDisplay markdownContent={project.caseStudyMarkdown} />
          </div>

          <aside className="md:col-span-1 space-y-6 sticky top-24">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{t('case_study_page.project_details_title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {project.client && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-semibold">{t('case_study_page.client_label')}</span> {project.client /* TODO: Localize client name */}
                    </div>
                  </div>
                )}
                {project.date && (
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                     <div>
                      <span className="font-semibold">{t('case_study_page.date_label')}</span> {project.date /* Date formatting might need localization */}
                    </div>
                  </div>
                )}
                {project.services && project.services.length > 0 && (
                   <div className="flex items-start gap-2">
                    <Settings2 className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <span className="font-semibold">{t('case_study_page.services_label')}</span>
                      {/* TODO: Localize service names */}
                      <ul className="list-disc list-inside ml-1">
                        {project.services.map(service => <li key={service}>{service}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </article>
    </PageContainer>
  );
}
