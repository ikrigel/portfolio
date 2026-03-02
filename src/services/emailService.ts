import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

export interface EmailPayload {
  sender_name: string;
  sender_email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(payload: EmailPayload): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      'EmailJS is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to .env.local'
    );
  }

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, payload as any);
}
