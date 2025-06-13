
import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, LayoutGrid, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getI18n, setStaticParamsLocale } from '@/locales/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    setStaticParamsLocale(locale);
    const t = await getI18n();
    return {
        title: t('services_page.meta_title'),
        description: t('services_page.meta_description'),
    };
}

const baseServicesData = [
    {
        key: 'consulting_services',
        icon: <Briefcase className="h-10 w-10 text-primary" />,
        image: 'https://images.unsplash.com/photo-1565728744382-61accd4aa148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8Y29uc3VsdGFudHxlbnwwfHx8fDE3NDg5NTcyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        key: 'product_management',
        icon: <LayoutGrid className="h-10 w-10 text-primary" />,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxwcm9qZWN0JTIwbWFuYWdlJTIwcHJvY2Vzc3xlbnwwfHx8fDE3NDg5NTc1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        key: 'team_recruitment',
        icon: <UserPlus className="h-10 w-10 text-primary" />,
        image: 'https://images.unsplash.com/photo-1512168681409-241f42d14bef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0ZWFtJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzQ4OTU4MDcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
];

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
    setStaticParamsLocale(locale);
    const t = await getI18n();

    const localizedServices = baseServicesData.map(service => {
        const serviceKey = service.key as 'consulting_services' | 'product_management' | 'team_recruitment';
        const features = t(`services_page.services.${serviceKey}.features`) as string[];

        return {
            ...service,
            title: t(`services_page.services.${serviceKey}.title`),
            description: t(`services_page.services.${serviceKey}.description`),
            features: Array.isArray(features) ? features : [],
            imageAlt: t(`services_page.services.${serviceKey}.image_alt`),
        };
    });


    return (
        <PageContainer>
            <section className="text-center py-12 md:py-16">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('services_page.page_title')}</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    {t('services_page.subtitle')}
                </p>
            </section>

            <section className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-1 gap-12">
                {localizedServices.map((service, index) => (
                    <Card key={service.key} className={`overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        <div className="md:w-1/2">
                            <Image
                                src={service.image}
                                alt={service.imageAlt}
                                width={600}
                                height={400}
                                className="object-cover w-full h-64 md:h-full"
                            />
                        </div>
                        <div className="md:w-1/2 flex flex-col">
                            <CardHeader>
                                <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                                    {service.icon}
                                </div>
                                <CardTitle className="text-2xl">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription className="mb-4">{service.description}</CardDescription>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
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
