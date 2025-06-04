
import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import TransformationStepCard from '@/components/features/transformation/TransformationStepCard';
import { ClipboardList, ListChecks, DraftingCompass, Rocket, Repeat } from 'lucide-react';
import Image from 'next/image';
import { getI18n, setStaticParamsLocale } from '@/locales/server';
import type { ReactNode } from 'react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  setStaticParamsLocale(locale);
  const t = await getI18n(locale);
  return {
    title: t('transformation_guide_page.meta_title'),
    description: t('transformation_guide_page.meta_description'),
  };
}

const baseTransformationSteps = [
  {
    key: 'assess_discover',
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
  },
  {
    key: 'plan_strategize',
    icon: <ListChecks className="h-8 w-8 text-primary" />,
  },
  {
    key: 'prototype_design',
    icon: <DraftingCompass className="h-8 w-8 text-primary" />,
  },
  {
    key: 'deploy_integrate',
    icon: <Rocket className="h-8 w-8 text-primary" />,
  },
  {
    key: 'iterate_optimize',
    icon: <Repeat className="h-8 w-8 text-primary" />,
  },
];

type TransformationStepKey = 'assess_discover' | 'plan_strategize' | 'prototype_design' | 'deploy_integrate' | 'iterate_optimize';


export default async function TransformationGuidePage({ params: { locale } }: { params: { locale: string }}) {
  setStaticParamsLocale(locale);
  const t = await getI18n(locale);

  const localizedSteps = baseTransformationSteps.map(step => {
    const stepKey = step.key as TransformationStepKey; 
    return {
      ...step,
      title: t(`transformation_guide_page.steps.${stepKey}.title`),
      description: t(`transformation_guide_page.steps.${stepKey}.description`),
    };
  });

  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('transformation_guide_page.page_title')}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('transformation_guide_page.subtitle')}
        </p>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-12">
            {localizedSteps.map((step, index) => (
              <div key={step.key} className="flex items-start gap-x-6 sm:gap-x-8">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground font-semibold text-lg sm:text-xl z-10"
                  >
                    {index + 1}
                  </div>
                  {index < localizedSteps.length - 1 && (
                    <div className="mt-1 w-0.5 flex-grow bg-border" style={{minHeight: '4rem'}}></div>
                  )}
                </div>
                <div className="flex-grow mt-0 sm:mt-1 min-w-0">
                  <TransformationStepCard
                    title={step.title}
                    description={step.description}
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
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8Y29vcGVyYXRlfGVufDB8fHx8MTc0ODk1ODM1NXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt={t('transformation_guide_page.partner_image_alt')}
              width={600}
              height={450}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
