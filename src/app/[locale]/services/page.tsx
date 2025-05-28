
import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, LayoutGrid, UserPlus } from 'lucide-react'; // Updated icons
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getI18n } from '@/locales/server'; 

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getI18n(locale);
  return {
    title: t('services_page.meta_title'),
    description: t('services_page.meta_description'),
  };
}

// Updated servicesData
// TODO: Localize service titles, descriptions, features in locale files
const servicesData = [
  {
    key: 'consulting_services',
    title: 'Consulting Services',
    description: 'Strategic guidance, process optimization, and digital roadmapping to align technology with your business objectives and drive growth. We help analyze your business needs and chart a course for digital success.',
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    features: ['Business process analysis & optimization', 'Digital strategy development', 'Technology stack consultation', 'Change management support', 'Market research & feasibility studies'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'business consulting'
  },
  {
    key: 'product_management',
    title: 'Product Management & Development',
    description: 'End-to-end product lifecycle management, from ideation and MVP development to market launch and iterative improvement. We ensure your product meets user needs and achieves business goals effectively.',
    icon: <LayoutGrid className="h-10 w-10 text-primary" />,
    features: ['Market research & validation', 'Product roadmap & feature prioritization', 'Agile development oversight', 'User story & requirements definition', 'MVP & prototype development'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'product management'
  },
  {
    key: 'team_recruitment',
    title: 'Team Recruitment & Augmentation',
    description: 'Building high-performing tech teams tailored to your project needs. We assist in finding, vetting, and onboarding skilled professionals, or augmenting your existing team with specialized talent.',
    icon: <UserPlus className="h-10 w-10 text-primary" />,
    features: ['Technical talent sourcing & screening', 'Skill-based vetting & interviews', 'Team onboarding & integration support', 'Dedicated team model setup', 'Staff augmentation for specific roles'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'team recruitment'
  },
];

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default async function ServicesPage({ params: { locale } }: { params: { locale: string }}) {
  const t = await getI18n(locale);
  // Example for localizing service titles/descriptions if they were in locale files under services_page.services.{key}.title etc.
  // const localizedServices = servicesData.map(service => ({
  //   ...service,
  //   title: t(`services_page.services.${service.key}.title`),
  //   description: t(`services_page.services.${service.key}.description`),
  //   features: service.features.map((feature, index) => t(`services_page.services.${service.key}.features.${index}`)), // Assuming features are an array of strings
  // }));
  // For now, using the English titles from servicesData as placeholders.
  // You'll need to add entries like 'services_page.services.consulting_services.title', etc., to your locale files.

  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('services_page.page_title')}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('services_page.subtitle')}
        </p>
      </section>

      <section className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-1 gap-12">
        {servicesData.map((service, index) => ( 
          <Card key={service.key} className={`overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className="md:w-1/2">
              <Image
                src={service.image}
                alt={service.title} // TODO: Localize alt text with t(`services_page.services.${service.key}.image_alt`)
                width={600}
                height={400}
                className="object-cover w-full h-64 md:h-full"
                data-ai-hint={service.aiHint}
              />
            </div>
            <div className="md:w-1/2 flex flex-col">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                  {service.icon}
                </div>
                {/* TODO: Localize service.title using t(`services_page.services.${service.key}.title`) */}
                <CardTitle className="text-2xl">{service.title}</CardTitle> 
              </CardHeader>
              <CardContent className="flex-grow">
                 {/* TODO: Localize service.description using t(`services_page.services.${service.key}.description`) */}
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {/* TODO: Localize service.features using an array in locale files and mapping, e.g., t(`services_page.services.${service.key}.features.${featureIndex}`) */}
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-center">
                      <CheckIcon className="h-4 w-4 mr-2 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                 <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto">
                    <Link href="/contact">{t('services_page.discuss_project_button')}</Link>
                  </Button>
              </div>
            </div>
          </Card>
        ))}
      </section>
      
      <section className="py-16 text-center bg-gradient-to-r from-primary/5 via-background to-background rounded-lg shadow-inner">
        <h2 className="text-3xl font-bold mb-6">{t('services_page.cta_title')}</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('services_page.cta_subtitle')}
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/contact">{t('services_page.cta_button')}</Link>
        </Button>
      </section>
    </PageContainer>
  );
}
