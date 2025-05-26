import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import ContactForm from '@/components/features/contact/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone, Linkedin, Twitter, Github } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Ciaodigi Navigator for inquiries, project discussions, or collaborations.',
};

export default function ContactPage() {
  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We're excited to hear from you! Whether you have a project idea, a question, or just want to say hello, feel free to reach out through the form below or our contact channels.
        </p>
      </section>

      <section className="py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@ciaodiginavigator.com" className="text-muted-foreground hover:text-primary">
                  info@ciaodiginavigator.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <p className="text-muted-foreground">
                  123 Digital Avenue, Tech City, TX 75001, USA
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Connect With Us</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Link href="#" aria-label="Twitter" className="p-2 rounded-md bg-secondary hover:bg-primary/20 text-primary">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="p-2 rounded-md bg-secondary hover:bg-primary/20 text-primary">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="GitHub" className="p-2 rounded-md bg-secondary hover:bg-primary/20 text-primary">
                <Github className="h-6 w-6" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageContainer>
  );
}
