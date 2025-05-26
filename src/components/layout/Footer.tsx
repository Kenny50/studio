
import Link from 'next/link';
import { Github, Linkedin, Twitter, ShipIcon } from 'lucide-react'; // Added ShipIcon
import NewsletterSubscribeForm from '@/components/features/newsletter/NewsletterSubscribeForm';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6 lg:col-span-7">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <ShipIcon className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-foreground">Ciaodigi Navigator</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              Your partner in digital transformation and custom software solutions. We build innovative web and mobile applications to help your business thrive.
            </p>
             <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Ciaodigi Navigator. All rights reserved.
            </p>
          </div>

          <div className="md:col-span-6 lg:col-span-5">
            <NewsletterSubscribeForm
              formTitle="Stay Updated"
              formDescription="Subscribe to our newsletter for the latest insights, articles, and company updates."
              ctaText="Subscribe"
              className="mb-6"
            />
            <div className="flex md:justify-start gap-4 mt-4">
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary p-2 rounded-md hover:bg-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary p-2 rounded-md hover:bg-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary p-2 rounded-md hover:bg-secondary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
