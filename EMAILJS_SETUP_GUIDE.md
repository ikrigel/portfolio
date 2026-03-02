# EmailJS Setup Guide

## Issue: "400 Bad Request" Error When Sending Emails

This error typically means your EmailJS template variables don't match the form payload.

## ✅ Quick Fix

### Step 1: Go to EmailJS Template Editor

1. Open https://www.emailjs.com/dashboard
2. Go to **Email Templates**
3. Click on your template (e.g., "Contact Form")
4. Click **Edit Template**

### Step 2: Verify Template Variables

Your template MUST use these exact variable names (case-sensitive):

```
Sender Name: {{sender_name}}
Sender Email: {{sender_email}}
Subject: {{subject}}
Message: {{message}}
```

### Step 3: Example Template Content

```
Name: {{sender_name}}
Email: {{sender_email}}
Subject: {{subject}}

Message:
{{message}}
```

### Step 4: Save and Test

1. Click **Save Template**
2. Test using **Test It**
3. Fill in test data for all variables
4. Click **Send Email**

## ✅ Form Payload

The form sends this structure:

```javascript
{
  sender_name: "User's Name",
  sender_email: "user@example.com",
  subject: "Contact Subject",
  message: "User's message text"
}
```

## ✅ Common Issues & Solutions

### Issue: Variables showing as {{variable}} in email
**Solution:** Make sure you're using double curly braces `{{variable}}` not single `{variable}`

### Issue: 400 Bad Request Error
**Solution:**
1. Check that all variable names match exactly: `sender_name`, `sender_email`, `subject`, `message`
2. Variable names are case-sensitive: `sender_name` NOT `SenderName` or `sender_Name`
3. Make sure the template exists and Template ID is correct in .env.local
4. Update your EmailJS template to use `{{sender_name}}` and `{{sender_email}}` instead of old names

### Issue: Email sent but missing information
**Solution:** Check that your template HTML uses all the variables you're sending

## ✅ Troubleshooting Checklist

- [ ] EmailJS account created
- [ ] Email Service configured (Gmail, SMTP, etc.)
- [ ] Template created with correct name
- [ ] Template uses: `{{sender_name}}`, `{{sender_email}}`, `{{subject}}`, `{{message}}`
- [ ] Service ID is in .env.local
- [ ] Template ID is in .env.local
- [ ] Public Key is in .env.local
- [ ] Test email sends successfully from EmailJS dashboard

## ✅ Testing Locally

```bash
npm run dev
# 1. Open http://localhost:5173
# 2. Scroll to Contact section
# 3. Fill in form:
#    - Name: Test User
#    - Email: your-email@example.com
#    - Subject: Test Subject
#    - Message: This is a test message that is at least 20 characters long
# 4. Click "Send Message"
# 5. Check your email
```

## ✅ For Production (Vercel)

Make sure these environment variables are set in Vercel project settings:

```
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_xxxxx
```

## ✅ Getting Your Credentials

### Service ID
1. Go to https://www.emailjs.com/dashboard
2. Click **Email Services**
3. Copy the Service ID (e.g., `service_abc123def456`)

### Template ID
1. Go to **Email Templates**
2. Click on your template
3. Copy the Template ID (e.g., `template_xyz789`)

### Public Key
1. Go to **Account Settings** → **API Keys**
2. Copy the **Public Key**

## Need More Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- Contact EmailJS Support: https://www.emailjs.com/support
- GitHub Issue: Create an issue in the repository
