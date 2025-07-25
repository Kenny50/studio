
import type { Metadata } from 'next';
import Image from 'next/image';
import PageContainer from '@/components/shared/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Users } from 'lucide-react';
import { getScopedI18n, setStaticParamsLocale } from '@/locales/server';
import type { ReactNode } from 'react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  setStaticParamsLocale(locale);
  const t = await getScopedI18n('about_page', locale);
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

// Helper Icon Components (could be moved to a separate file if used widely)
function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}

// Define a type for the icon map keys
type CoreValueIconKey = 'innovation' | 'collaboration' | 'integrity' | 'excellence';

// Map of icon keys to icon components
const iconMap: Record<CoreValueIconKey, ReactNode> = {
  innovation: <LightbulbIcon className="h-8 w-8 text-primary" />,
  collaboration: <Users className="h-8 w-8 text-primary" />,
  integrity: <ShieldIcon className="h-8 w-8 text-primary" />,
  excellence: <Award className="h-8 w-8 text-primary" />,
};


export default async function AboutPage({ params: { locale } }: { params: { locale: string }}) {
  setStaticParamsLocale(locale);
  const aboutT = await getScopedI18n('about_page', locale); 

  type LocalizedCoreValueItem = { key: CoreValueIconKey; title: string; description: string };
  
  const { core_values_list } = (await import(`@/locales/${locale}`)).default.about_page;

  let coreValues: Array<{ title: string; description: string; icon: React.ReactNode }> = [];

  if (Array.isArray(core_values_list)) {
    coreValues = (core_values_list as LocalizedCoreValueItem[]).map(value => {
      return {
        title: value.title, 
        description: value.description, 
        icon: iconMap[value.key] || <Award className="h-8 w-8 text-primary" /> 
      };
    });
  } else {
    console.error(
      `Error: 'core_values_list' (from scope 'about_page') from locale '${locale}' is not an array or is missing. Received:`,
      core_values_list
    );
  }


  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{aboutT('page_title')}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {aboutT('subtitle')}
        </p>
      </section>

      <section className="py-12 md:py-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">{aboutT('our_story_title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              {aboutT('story_p1')}
            </p>
            <p>
              {aboutT('story_p2')}
            </p>
             <Image
                src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjB0aGlua2luZ3xlbnwwfHx8fDE3NDg5NTcxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt={aboutT('our_story_image_alt')}
                width={1200}
                height={400}
                className="rounded-lg mt-6 object-cover"
              />
          </CardContent>
        </Card>
      </section>

      <section className="py-12 md:py-16 px-6 md:px-10 bg-secondary/30 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">{aboutT('core_values_title')}</h2>
        {coreValues.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value) => (
              <Card key={value.title} className="text-center shadow-lg">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-md w-fit mx-auto mb-4">
                    {value.icon}
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
           <p className="text-center text-muted-foreground">{aboutT('core_values_loading_error')}</p>
        )}
      </section>
    </PageContainer>
  );
}
