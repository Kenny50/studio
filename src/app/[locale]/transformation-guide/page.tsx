
import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import TransformationStepCard from '@/components/features/transformation/TransformationStepCard';
import { ClipboardList, ListChecks, DraftingCompass, Rocket, Repeat } from 'lucide-react';
import Image from 'next/image';
import { getI18n } from '@/locales/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getI18n(locale);
  return {
    title: t('transformation_guide_page.meta_title'),
    description: t('transformation_guide_page.meta_description'),
  };
}

// TODO: This data should be localized (titles, descriptions)
const transformationStepsData = [
  {
    key: 'assess_discover',
    title: 'Assess & Discover',
    description: 'We begin by thoroughly understanding your current processes, challenges, and goals. This involves workshops, stakeholder interviews, and market analysis to identify key opportunities for digital transformation.',
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
  },
  {
    key: 'plan_strategize',
    title: 'Plan & Strategize',
    description: 'Based on the assessment, we develop a comprehensive digital transformation roadmap. This includes defining clear objectives, selecting appropriate technologies, and outlining a phased implementation plan with measurable milestones.',
    icon: <ListChecks className="h-8 w-8 text-primary" />,
  },
  {
    key: 'prototype_design',
    title: 'Prototype & Design',
    description: 'We create interactive prototypes and detailed designs to visualize the proposed solution. This iterative process ensures alignment with your vision and allows for early feedback before full-scale development.',
    icon: <DraftingCompass className="h-8 w-8 text-primary" />,
  },
  {
    key: 'deploy_integrate',
    title: 'Deploy & Integrate',
    description: 'Our expert team develops and deploys the solution, ensuring seamless integration with your existing systems. We follow agile methodologies for efficient development and rigorous testing for quality assurance.',
    icon: <Rocket className="h-8 w-8 text-primary" />,
  },
  {
    key: 'iterate_optimize',
    title: 'Iterate & Optimize',
    description: 'Post-launch, we continuously monitor performance, gather user feedback, and provide ongoing support. We believe in iterative improvement to ensure your digital solution evolves with your business and market demands.',
    icon: <Repeat className="h-8 w-8 text-primary" />,
  },
];

export default async function TransformationGuidePage({ params: { locale } }: { params: { locale: string }}) {
  const t = await getI18n(locale);
  // Example for localizing step titles/descriptions if they were in locale files under transformation_guide_page.steps.{key}.title etc.
  // const localizedSteps = transformationStepsData.map(step => ({
  //   ...step,
  //   title: t(`transformation_guide_page.steps.${step.key}.title`),
  //   description: t(`transformation_guide_page.steps.${step.key}.description`),
  // }));
  // For now, using the English titles from transformationStepsData

  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('transformation_guide_page.page_title')}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('transformation_guide_page.subtitle')}
        </p>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto"> {/* Was max-w-4xl, reverting for better centered view */}
          <div className="space-y-12">
            {transformationStepsData.map((step, index) => (
              <div key={step.key} className="flex items-start gap-x-6 sm:gap-x-8">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground font-semibold text-lg sm:text-xl z-10"
                  >
                    {index + 1}
                  </div>
                  {index < transformationStepsData.length - 1 && (
                    <div className="mt-1 w-0.5 flex-grow bg-border" style={{minHeight: '4rem'}}></div>
                  )}
                </div>
                <div className="flex-grow mt-0 sm:mt-1 min-w-0">
                  <TransformationStepCard
                    title={step.title} // TODO: Localize step.title
                    description={step.description} // TODO: Localize step.description
                    icon={step.icon}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-secondary/30 p-8 md:p-12 rounded-lg shadow-lg">
          <div>
            <h2 className="text-3xl font-bold mb-6">{t('transformation_guide_page.partner_title')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('transformation_guide_page.partner_desc1')}
            </p>
            <p className="text-muted-foreground">
              {t('transformation_guide_page.partner_desc2')}
            </p>
          </div>
          <div>
            <Image
              src="https://placehold.co/600x450.png"
              alt={t('transformation_guide_page.partner_title')} // TODO: More specific alt text
              width={600}
              height={450}
              className="rounded-lg shadow-xl"
              data-ai-hint="digital transformation"
            />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
