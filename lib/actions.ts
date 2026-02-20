'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, 'Name too short').max(100, 'Name too long'),
  email: z.string().email('Invalid email'),
  company: z.string().max(100).optional(),
  message: z.string().min(10, 'Message too short').max(1000, 'Message too long'),
});

export async function submitContactForm(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  };

  const validationResult = contactSchema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues[0].message,
    };
  }

  const { name, email, company, message } = validationResult.data;

  try {
    await resend.emails.send({
      from: 'contact@retrospective.sk',
      to: 'info@retrospective.sk',
      subject: `New contact form submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}

Message:
${message}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    return {
      success: false,
      error: 'Failed to send message. Please try again.',
    };
  }
}
