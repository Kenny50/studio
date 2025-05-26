import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Database, Palette, Rocket, Smartphone, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore the range of services offered by Ciaodigi Navigator, including custom web and mobile development, UI/UX design, and digital strategy.',
};

const services = [
  {
    title: 'Custom Web Development',
    description: 'We build scalable, secure, and high-performance web applications tailored to your specific business needs. From complex enterprise platforms to engaging marketing sites, we deliver excellence.',
    icon: <Code className="h-10 w-10 text-primary" />,
    features: ['Full-stack development (React, Node.js, Python, etc.)', 'E-commerce solutions', 'CMS development', 'API integration'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'web development'
  },
  {
    title: 'Mobile App Development',
    description: 'Crafting intuitive and powerful mobile applications for iOS and Android. We help you connect with your audience on their favorite devices, enhancing engagement and accessibility.',
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    features: ['Native iOS (Swift) & Android (Kotlin/Java)', 'Cross-platform (React Native, Flutter)', 'App store deployment', 'Maintenance & support'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'mobile app'
  },
  {
    title: 'UI/UX Design',
    description: 'User-centric design that is both beautiful and functional. We create seamless digital experiences that delight users and achieve your business objectives.',
    icon: <Palette className="h-10 w-10 text-primary" />,
    features: ['User research & personas', 'Wireframing & prototyping', 'Interaction design', 'Usability testing'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'ui ux design'
  },
  {
    title: 'Digital Strategy & Consulting',
    description: 'Guiding your digital transformation journey with expert insights and actionable strategies. We help you leverage technology to innovate, optimize, and grow.',
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    features: ['Market analysis', 'Technology roadmapping', 'Process automation', 'Data analytics & insights'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'digital strategy'
  },
  {
    title: 'Cloud Solutions & DevOps',
    description: 'Modernize your infrastructure with scalable cloud solutions and efficient DevOps practices. We ensure your applications are reliable, secure, and performant.',
    icon: <Rocket className="h-10 w-10 text-primary" />,
    features: ['Cloud migration (AWS, Azure, GCP)', 'CI/CD pipeline setup', 'Infrastructure as Code', 'Monitoring & alerting'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'cloud devops'
  },
   {
    title: 'Data Engineering & Analytics',
    description: 'Unlock the power of your data with our robust data engineering and analytics services. We help you make informed decisions and gain a competitive edge.',
    icon: <Database className="h-10 w-10 text-primary" />,
    features: ['Data pipeline development', 'Data warehousing', 'Business intelligence dashboards', 'Machine learning model deployment'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'data analytics'
  },
];

export default function ServicesPage() {
  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Expertise</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          At Ciaodigi Navigator, we offer a comprehensive suite of services designed to empower your business in the digital age. Our team of experts is dedicated to delivering innovative solutions that drive results.
        </p>
      </section>

      <section className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-1 gap-12">
        {services.map((service, index) => (
          <Card key={service.title} className={`overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className="md:w-1/2">
              <Image
                src={service.image}
                alt={service.title}
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
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
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
                    <Link href="/contact">Discuss Your Project</Link>
                  </Button>
              </div>
            </div>
          </Card>
        ))}
      </section>
      
      <section className="py-16 text-center bg-gradient-to-r from-primary/5 via-background to-background rounded-lg shadow-inner">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Digital Journey?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let's collaborate to turn your ideas into reality. Contact us today for a free consultation.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/contact">Get a Free Quote</Link>
        </Button>
      </section>
    </PageContainer>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
