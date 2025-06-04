
"use client";

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Mail, Instagram, Linkedin, Loader2, AlertTriangle } from 'lucide-react';
import { useI18n } from '@/locales/client';

interface NewsletterSubscribeFormProps {
  className?: string;
}

export default function NewsletterSubscribeForm({
  className,
}: NewsletterSubscribeFormProps) {
  const t = useI18n();
  const [email, setEmail] = useState('');
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setFormError(t('newsletter_form.email_empty_error'));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError(t('newsletter_form.email_invalid_error'));
      return;
    }
    setFormError('');
    setIsSubscribing(true);

    try {
      const response = await axios.post(
        'https://oe5lu0h3xf.execute-api.ap-northeast-1.amazonaws.com/production/subscribe-newsletter',
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200 || response.status === 201) {
        setIsSuccessDialogOpen(true);
        setEmail(''); 
      } else {
        setIsErrorDialogOpen(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios newsletter subscription error:', {
          message: error.message,
          name: error.name,
          code: error.code,
          isAxiosError: error.isAxiosError,
          config_url: error.config?.url,
          config_method: error.config?.method,
          request_readyState: error.request?.readyState,
          request_status: error.request?.status,
          response_status: error.response?.status,
          response_data: error.response?.data,
        });
      } else {
        console.error('Non-Axios newsletter subscription error:', error);
      }
      setIsErrorDialogOpen(true);
    } finally {
      setIsSubscribing(false);
    }
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
              if (formError) setFormError('');
            }}
            aria-label="Email for newsletter"
            className={`w-full ${formError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            disabled={isSubscribing}
          />
          {formError && <p className="text-destructive text-xs mt-1">{formError}</p>}
        </div>
        <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap" disabled={isSubscribing}>
          {isSubscribing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('newsletter_form.subscribing_button')}
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" /> {t('newsletter_form.subscribe_now_button')}
            </>
          )}
        </Button>
      </form>

      <Dialog open={isSuccessDialogOpen} onOpenChange={(isOpen) => {
        setIsSuccessDialogOpen(isOpen);
      }}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">{t('newsletter_form.dialog_title')}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center mt-2 mb-4 text-muted-foreground">
            {t('newsletter_form.dialog_description')}
          </DialogDescription>
          {/* <div className="flex justify-center gap-4 my-4">
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
          </div> */}
          <DialogFooter className="mt-6 flex justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {t('newsletter_form.close_button')}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogHeader className="text-center">
             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            <DialogTitle className="text-2xl font-bold">{t('newsletter_form.error_dialog_title')}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center mt-2 mb-4 text-muted-foreground">
            {t('newsletter_form.error_dialog_description')}
          </DialogDescription>
          <DialogFooter className="mt-6 flex justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {t('newsletter_form.close_button')}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
