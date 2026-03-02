import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { validateContactForm, hasErrors } from '@/utils/validators';
import { sendContactEmail } from '@/services/emailService';
import { Notification } from '@/components/ui/Notification';
import { useSettings } from '@/contexts/SettingsContext';
import { useLogger } from '@/hooks/useLogger';
import { AUTO_SAVE_INTERVAL_MS } from '@/utils/constants';
import type { ContactFormData, ContactFormErrors } from '@/utils/validators';

export function ContactForm() {
  const { settings, updateSettings } = useSettings();
  const { log } = useLogger();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState<'success' | 'error'>('success');
  const [draftRestored, setDraftRestored] = useState(false);

  useEffect(() => {
    if (settings.contactFormData && !draftRestored) {
      const draft = settings.contactFormData;
      setFormData({
        name: draft.name,
        email: draft.email,
        subject: draft.subject,
        message: draft.message,
      });
      setDraftRestored(true);
      setNotificationMessage('Draft restored from your last visit');
      setNotificationSeverity('success');
      setNotificationOpen(true);
      log('info', 'contact_form_draft_restored', '');
    }
  }, [settings.contactFormData, draftRestored, log]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.name || formData.email || formData.subject || formData.message) {
        updateSettings({
          contactFormData: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            savedAt: new Date().toISOString(),
          },
        });
        log('verbose', 'contact_form_autosave', 'Draft saved');
      }
    }, AUTO_SAVE_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [formData, updateSettings, log]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name as keyof ContactFormErrors];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateContactForm(formData);
    if (hasErrors(newErrors)) {
      setErrors(newErrors);
      log('verbose', 'contact_form_validation_failed', `Errors: ${Object.keys(newErrors).join(', ')}`);
      return;
    }

    setStatus('sending');
    log('info', 'contact_form_submit_start', '');

    try {
      await sendContactEmail({
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setStatus('success');
      setNotificationMessage('Message sent successfully! Thank you for reaching out.');
      setNotificationSeverity('success');
      setNotificationOpen(true);

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      updateSettings({ contactFormData: null });

      log('info', 'contact_form_submit_success', '');
    } catch (error) {
      setStatus('error');
      let errorMsg = 'Failed to send message';

      if (error instanceof Error) {
        errorMsg = error.message;
        // Check for common EmailJS errors
        if (errorMsg.includes('400')) {
          errorMsg = 'EmailJS template configuration error. Check that template variables match your form fields.';
        } else if (errorMsg.includes('auth')) {
          errorMsg = 'EmailJS authentication failed. Check your Service ID, Template ID, and Public Key.';
        }
      }

      setNotificationMessage(errorMsg);
      setNotificationSeverity('error');
      setNotificationOpen(true);
      log('error', 'contact_form_submit_failed', errorMsg);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 600,
        }}
      >
        {status === 'error' && (
          <Alert severity="error">
            Failed to send message. Please check your email configuration.
          </Alert>
        )}

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
          disabled={status === 'sending'}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          disabled={status === 'sending'}
        />

        <TextField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          fullWidth
          error={!!errors.subject}
          helperText={errors.subject}
          disabled={status === 'sending'}
        />

        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={5}
          fullWidth
          error={!!errors.message}
          helperText={errors.message}
          disabled={status === 'sending'}
        />

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={status === 'sending'}
            sx={{ position: 'relative' }}
          >
            {status === 'sending' && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  left: 0,
                  marginLeft: 1,
                }}
              />
            )}
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </Button>
        </Box>
      </Box>

      <Notification
        open={notificationOpen}
        message={notificationMessage}
        severity={notificationSeverity}
        onClose={() => setNotificationOpen(false)}
      />
    </>
  );
}
