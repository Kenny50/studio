import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Lightbulb, Users } from 'lucide-react';
import PageContainer from '@/components/shared/PageContainer';
import Image from 'next/image';

export default function Home() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 rounded-lg bg-gradient-to-br from-primary/10 via-background to-background shadow-inner">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Navigate Your Digital Future with <span className="text-primary">Ciaodigi</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            We partner with businesses to build innovative web and mobile solutions, guiding you through every step of your digital transformation journey.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Our Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Offerings</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Custom Web Development</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Tailored web applications that drive growth, engagement, and efficiency for your business.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
              </div>
              <CardTitle>Mobile App Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Engaging and intuitive mobile experiences for iOS and Android, connecting you with your users on the go.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Digital Transformation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Strategic guidance and expert execution to modernize your operations and unlock new digital opportunities.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-secondary/30 rounded-lg">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Partner with Ciaodigi Navigator?</h2>
            <p className="text-muted-foreground mb-6">
              We are more than just developers; we are your strategic partners in innovation. Our approach is rooted in understanding your unique challenges and goals to deliver solutions that make a real impact.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Client-Centric Approach</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Expert Team & Proven Process</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Focus on Quality & Scalability</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Transparent Communication</span>
              </li>
            </ul>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
          <div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="Team collaborating"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="team collaboration"
            />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
