
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

interface NewsletterSubscribeFormProps {
  ctaText?: string;
  formTitle?: string;
  formDescription?: string;
  className?: string;
}

export default function NewsletterSubscribeForm({
  ctaText = "Subscribe",
  formTitle,
  formDescription,
  className,
}: NewsletterSubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Email address cannot be empty.');
      setShowError(true);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setShowError(true);
      return;
    }
    setShowError(false);
    setErrorMessage('');
    // Mock submission
    console.log('Subscribed with:', email);
    setIsDialogOpen(true);
    // setEmail(''); // Optionally clear email field after submission dialog is confirmed closed
  };

  return (
    <div className={className}>
      {formTitle && <h3 className="text-lg font-semibold mb-2 text-foreground">{formTitle}</h3>}
      {formDescription && <p className="text-sm text-muted-foreground mb-4">{formDescription}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start">
        <div className="w-full sm:flex-grow">
          <Input
            type="email"
            placeholder="Enter your email"
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
          <Mail className="mr-2 h-4 w-4" /> {ctaText}
        </Button>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
        if (!isOpen) {
          setEmail(''); // Clear email when dialog closes
        }
      }}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">Thank You for Subscribing!</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center mt-2 mb-4 text-muted-foreground">
            You might also want to follow our social media channels for more updates:
          </DialogDescription>
          <div className="flex justify-center gap-4 my-4">
            <Button variant="outline" asChild>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="mr-2 h-5 w-5" /> Instagram
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
