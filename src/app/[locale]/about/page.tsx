
import type { Metadata } from 'next';
import Image from 'next/image';
import PageContainer from '@/components/shared/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Briefcase, Heart, Users } from 'lucide-react';
// TODO: Add i18n for this page
// import { getI18n } from '@/locales/server';

// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
//   const t = await getI18n(locale);
//   return {
//     title: t('about_page.meta_title'), // Example key
//     description: t('about_page.meta_description'), // Example key
//   };
// }

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Ciaodigi Navigator, our mission, team, and core values.',
};


const teamMembers = [
  {
    name: 'Alice Wonderland',
    role: 'CEO & Lead Strategist',
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'professional woman',
    bio: 'Alice drives the vision with over a decade of experience in digital innovation and strategy.'
  },
  {
    name: 'Bob The Builder',
    role: 'CTO & Head of Engineering',
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'professional man',
    bio: 'Bob leads our talented engineering team, ensuring technical excellence and cutting-edge solutions.'
  },
  {
    name: 'Carol Danvers',
    role: 'Lead UX/UI Designer',
    imageUrl: 'https://placehold.co/300x300.png',
    aiHint: 'creative designer',
    bio: 'Carol crafts intuitive and beautiful user experiences that captivate and engage.'
  },
];

const coreValues = [
  { title: 'Innovation', description: 'We constantly seek new ways to solve problems and create value.', icon: <LightbulbIcon className="h-8 w-8 text-primary" /> },
  { title: 'Collaboration', description: 'We believe the best results come from working closely with our clients and as a team.', icon: <Users className="h-8 w-8 text-primary" /> },
  { title: 'Integrity', description: 'We operate with honesty and transparency in all our interactions.', icon: <ShieldIcon className="h-8 w-8 text-primary" /> },
  { title: 'Excellence', description: 'We are committed to delivering high-quality solutions that exceed expectations.', icon: <Award className="h-8 w-8 text-primary" /> },
];

export default function AboutPage() {
  // const t = await getI18n(); // TODO: Uncomment when translations are ready for this page

  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Ciaodigi Navigator</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We are a passionate team of strategists, designers, and developers dedicated to helping businesses thrive in the digital landscape.
        </p>
      </section>

      <section className="py-12 md:py-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Founded in [Year], Ciaodigi Navigator embarked on a mission to demystify digital technology for businesses of all sizes. We saw a need for a partner who not only builds exceptional software but also guides clients through the complexities of digital transformation with clarity and expertise.
            </p>
            <p>
              Over the years, we've honed our skills, expanded our team, and successfully delivered numerous projects across various industries. Our journey is fueled by a relentless pursuit of innovation and a deep commitment to our clients' success. We believe that technology, when wielded thoughtfully, can unlock unprecedented growth and efficiency.
            </p>
             <Image
                src="https://placehold.co/1200x400.png"
                alt="Company timeline or abstract representation"
                width={1200}
                height={400}
                className="rounded-lg mt-6 object-cover"
                data-ai-hint="company history"
              />
          </CardContent>
        </Card>
      </section>

      <section className="py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
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

      <section className="py-12 md:py-16 bg-secondary/30 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
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
