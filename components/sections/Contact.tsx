'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { submitContactForm } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const t = useTranslations('contact');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.success) {
        toast.success(t('success'));
        // Reset form
        const form = document.getElementById('contact-form') as HTMLFormElement;
        if (form) {
          form.reset();
        }
      } else if ('error' in result) {
        toast.error(result.error);
      } else if ('errors' in result) {
        // Show first error in toast
        toast.error(result.errors[0] || t('error'));
      }
    });
  };

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-slate-600">{t('subtitle')}</p>
          </div>

          {/* Form */}
          <form
            id="contact-form"
            action={handleSubmit}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t('form.name')}
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                disabled={isPending}
                placeholder={t('form.name')}
                className="w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t('form.email')}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                disabled={isPending}
                placeholder={t('form.email')}
                className="w-full"
              />
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t('form.company')}
              </label>
              <Input
                id="company"
                name="company"
                type="text"
                disabled={isPending}
                placeholder={t('form.company')}
                className="w-full"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t('form.message')}
              </label>
              <Textarea
                id="message"
                name="message"
                required
                disabled={isPending}
                placeholder={t('form.message')}
                className="w-full min-h-32"
                rows={6}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isPending}
                className="px-8 py-6 text-base"
              >
                {isPending ? t('form.sending') : t('form.send')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
