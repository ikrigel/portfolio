# Vercel Deployment & EmailJS Setup Guide

## 🚀 Quick Start - EmailJS on Vercel

### Step 1: Go to Your Vercel Project Settings

1. Visit [vercel.com](https://vercel.com)
2. Select your **portfolio** project
3. Click **Settings** in the top menu
4. Go to **Environment Variables** (left sidebar)

### Step 2: Add Environment Variables

Add these THREE environment variables exactly as shown:

| Variable Name | Value | Notes |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | `service_eghiyme` | Don't include backticks |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_rnuub2q` | Don't include backticks |
| `VITE_EMAILJS_PUBLIC_KEY` | `4aMkGokEYDP1_lL5-` | Don't include backticks |

⚠️ **IMPORTANT:** Environment variable names are **case-sensitive**. Use exact names above.

### Step 3: Redeploy Your Project

1. Click **Deployments** in the top menu
2. Find your latest deployment
3. Click the **3-dot menu** (⋯) on the right
4. Select **Redeploy**
5. Click **Redeploy** again to confirm

**Wait 2-3 minutes** for deployment to complete.

---

## ✅ Verify Everything Works

After redeployment, test in this order:

### 1. Check Images Load
- Visit your portfolio live link
- Scroll to Hero section
- Avatar photo should appear
- Parallax neural network background should appear

### 2. Test Email Form
- Scroll to Contact section
- Fill in form:
  - Name: `Test User`
  - Email: `your-email@example.com`
  - Subject: `Test Message`
  - Message: `This is a test message from Vercel`
- Click **Send Message**
- Check your email for the message

### 3. Check Console for Errors
- Open DevTools (F12 or Right-click → Inspect)
- Go to **Console** tab
- Send a test message
- Should see no errors (ignore warnings)

---

## 🔧 Troubleshooting

### **Issue: "Cannot read properties of undefined (reading 'payload')"**
- **Cause:** Missing environment variables on Vercel
- **Fix:** Re-follow Step 1-3 above

### **Issue: Images Not Showing (Avatar & Parallax)**
- **Cause:** Deployment failed due to missing env vars
- **Fix:** Once env vars are set and redeployed, images will appear
- **Note:** Images are stored in `/public/pictures/` and deployed automatically

### **Issue: "EmailJS is not configured"**
- **Cause:** Environment variables not set properly
- **Fix:**
  1. Double-check variable names are EXACTLY as shown in Step 2
  2. Make sure you used the correct values from `.env.local`
  3. Redeploy after adding variables

### **Issue: Email Sending Fails**
- **Cause:** Template ID or Service ID is wrong
- **Fix:**
  1. Go to [EmailJS Dashboard](https://www.emailjs.com/dashboard)
  2. Check **Email Services** for correct Service ID
  3. Check **Email Templates** for correct Template ID
  4. Update Vercel env vars if needed
  5. Redeploy

---

## 📋 Checklist

- [ ] Added VITE_EMAILJS_SERVICE_ID to Vercel
- [ ] Added VITE_EMAILJS_TEMPLATE_ID to Vercel
- [ ] Added VITE_EMAILJS_PUBLIC_KEY to Vercel
- [ ] Redeployed project on Vercel
- [ ] Waited 2-3 minutes for deployment to complete
- [ ] Verified avatar image appears in Hero section
- [ ] Verified parallax background appears
- [ ] Sent test email and received it

---

## 🆘 Still Having Issues?

1. **Check Vercel Deployment Logs:**
   - Go to Vercel dashboard
   - Click **Deployments**
   - Click on failed deployment
   - Check "Logs" tab for error messages

2. **Check Browser Console:**
   - Press F12 to open DevTools
   - Go to Console tab
   - Look for specific error messages
   - Screenshot and share the error

3. **Verify .env.local Locally:**
   ```bash
   npm run dev
   # Visit http://localhost:5173
   # Test email form locally first
   # This ensures your EmailJS setup is correct
   ```

4. **Check EmailJS Account:**
   - Is your EmailJS account active?
   - Do you have email quota available?
   - Have you configured the email service (Gmail, SMTP, etc.)?

---

## 📚 Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Public Assets](https://vitejs.dev/guide/assets.html)
