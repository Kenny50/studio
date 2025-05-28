
import type { Metadata } from 'next';
import Image from 'next/image';
import PageContainer from '@/components/shared/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Users } from 'lucide-react';
import { getI18n } from '@/locales/server';
import type { ReactNode } from 'react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getI18n(locale);
  return {
    title: t('about_page.meta_title'),
    description: t('about_page.meta_description'),
  };
}

// Team members and core values data could also be localized if needed
const teamMembers = [
  {
    name: 'Alice Wonderland', // TODO: Localize name if needed
    role: 'CEO & Lead Strategist', // TODO: Localize role
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'professional woman',
    bio: 'Alice drives the vision with over a decade of experience in digital innovation and strategy.' // TODO: Localize bio
  },
  {
    name: 'Bob The Builder', // TODO: Localize name
    role: 'CTO & Head of Engineering', // TODO: Localize role
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'professional man',
    bio: 'Bob leads our talented engineering team, ensuring technical excellence and cutting-edge solutions.' // TODO: Localize bio
  },
  {
    name: 'Carol Danvers', // TODO: Localize name
    role: 'Lead UX/UI Designer', // TODO: Localize role
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'creative designer',
    bio: 'Carol crafts intuitive and beautiful user experiences that captivate and engage.' // TODO: Localize bio
  },
];

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
  const t = await getI18n(locale);

  // Fetch core values from locale file
  // The type assertion is needed because getI18n returns a broad type
  const localizedCoreValues = t('about_page.core_values_list') as Array<{ key: string; title: string; description: string }>;

  const coreValues = localizedCoreValues.map(value => ({
    title: value.title,
    description: value.description,
    icon: iconMap[value.key as CoreValueIconKey] // Use the key to get the icon component
  }));


  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('about_page.page_title')}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('about_page.subtitle')}
        </p>
      </section>

      <section className="py-12 md:py-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">{t('about_page.our_story_title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              {t('about_page.story_p1')}
            </p>
            <p>
              {t('about_page.story_p2')}
            </p>
             <Image
                src="https://placehold.co/1200x400.png"
                alt={t('about_page.our_story_title')} 
                width={1200}
                height={400}
                className="rounded-lg mt-6 object-cover"
                data-ai-hint="company history"
              />
          </CardContent>
        </Card>
      </section>

      {/* 
      TODO: Localize team members section if needed
      <section className="py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-12">{t('about_page.meet_team_title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4 border-4 border-primary/20"
                  data-ai-hint={member.aiHint}
                />
                <CardTitle>{member.name}</CardTitle>
                <p className="text-primary font-semibold">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> 
      */}

      <section className="py-12 md:py-16 px-6 md:px-10 bg-secondary/30 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">{t('about_page.core_values_title')}</h2>
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
      </section>
    </PageContainer>
  );
}
