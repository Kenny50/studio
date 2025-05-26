
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useI18n } from '@/locales/client'; // Import useI18n

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }), // Keep Zod messages in English for dev
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
});

export default function ContactForm() {
  const t = useI18n(); // Initialize useI18n
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    startTransition(() => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log("Form submitted:", values);
          toast({
            title: t('contact_form.success_title'),
            description: t('contact_form.success_description'),
          });
          form.reset();
          resolve();
        }, 1500);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact_form.full_name_label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('contact_form.full_name_placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact_form.email_label')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t('contact_form.email_placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact_form.subject_label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('contact_form.subject_placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact_form.message_label')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('contact_form.message_placeholder')} rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('contact_form.sending_button')}
            </>
          ) : (
            t('contact_form.send_message_button')
          )}
        </Button>
      </form>
    </Form>
  );
}
