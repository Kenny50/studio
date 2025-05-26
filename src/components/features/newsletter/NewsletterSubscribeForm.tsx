
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Mail, Instagram, Linkedin } from 'lucide-react';
import { useI18n } from '@/locales/client'; // Import useI18n

interface NewsletterSubscribeFormProps {
  className?: string;
}

export default function NewsletterSubscribeForm({
  className,
}: NewsletterSubscribeFormProps) {
  const t = useI18n(); // Initialize useI18n
  const [email, setEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage(t('newsletter_form.email_empty_error'));
      setShowError(true);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage(t('newsletter_form.email_invalid_error'));
      setShowError(true);
      return;
    }
    setShowError(false);
    setErrorMessage('');
    console.log('Subscribed with:', email);
    setIsDialogOpen(true);
  };

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-2 text-foreground">{t('newsletter_form.form_title')}</h3>
      <p className="text-sm text-muted-foreground mb-4">{t('newsletter_form.form_description')}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start">
        <div className="w-full sm:flex-grow">
          <Input
            type="email"
            placeholder={t('newsletter_form.email_placeholder')}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (showError) setShowError(false);
            }}
            aria-label="Email for newsletter"
            className={`w-full ${showError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          />
          {showError && <p className="text-destructive text-xs mt-1">{errorMessage}</p>}
        </div>
        <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
          <Mail className="mr-2 h-4 w-4" /> {t('newsletter_form.subscribe_now_button')}
        </Button>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
        if (!isOpen) {
          setEmail('');
        }
      }}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">{t('newsletter_form.dialog_title')}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center mt-2 mb-4 text-muted-foreground">
            {t('newsletter_form.dialog_description')}
          </DialogDescription>
          <div className="flex justify-center gap-4 my-4">
            <Button variant="outline" asChild>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="mr-2 h-5 w-5" /> {t('newsletter_form.instagram_button')}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="mr-2 h-5 w-5" /> {t('newsletter_form.linkedin_button')}
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {t('newsletter_form.close_button')}
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
