
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
import { useI18n } from '@/locales/client';
import axios from 'axios';

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }), // Changed from name
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().optional(), // Added optional phone number
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }), // Kept in form, not sent to API
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
});

export default function ContactForm() {
  const t = useI18n();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    startTransition(async () => {
      try {
        const jsonData: {
          full_name: string;
          email: string;
          message: string;
          phone_number?: string;
        } = {
          full_name: values.fullName,
          email: values.email,
          message: values.message,
        };

        if (values.phoneNumber) {
          jsonData.phone_number = values.phoneNumber;
        }

        await axios.post(
          'https://pcr3v8zjv1.execute-api.ap-northeast-1.amazonaws.com/company-site/CiaoMailServiceResource',
          jsonData,
          { headers: { 'Content-Type': 'application/json' } }
        );

        toast({
          title: t('contact_form.success_title'),
          description: t('contact_form.success_description'),
        });
        form.reset();
      } catch (error) {
        let errorMessage = t('contact_form.error_description');
        if (axios.isAxiosError(error)) {
          console.error('Axios contact form error:', {
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
          if (error.response?.data?.message) {
            errorMessage = `${t('contact_form.error_description')} Server responded: ${error.response.data.message}`;
          } else if (error.message) {
             errorMessage = `${t('contact_form.error_description')} Details: ${error.message}`;
          }
        } else {
          console.error('Non-Axios contact form error:', error);
           if (error instanceof Error) {
            errorMessage = `${t('contact_form.error_description')} Details: ${error.message}`;
          }
        }
        toast({
          title: t('contact_form.error_title'),
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contact_form.phone_number_label')}</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder={t('contact_form.phone_number_placeholder')} {...field} />
                </FormControl>
                <FormMessage /> {/* For potential Zod validation messages specific to phone */}
              </FormItem>
            )}
          />
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
