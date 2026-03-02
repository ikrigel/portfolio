export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!isNonEmpty(data.name)) {
    errors.name = 'Name is required.';
  }

  if (!isNonEmpty(data.email)) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!isNonEmpty(data.subject)) {
    errors.subject = 'Subject is required.';
  }

  if (!isNonEmpty(data.message)) {
    errors.message = 'Message is required.';
  } else if (data.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.';
  }

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
