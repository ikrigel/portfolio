# DEPLOYMENT.md - Deployment Guide

## Prerequisites

- GitHub account with repository
- Vercel account (free tier available)
- EmailJS account and credentials
- Node.js 18+ installed locally

## Local Setup

### 1. Install Dependencies
```bash
cd /c/portfolio
npm install
```

### 2. Configure Environment Variables

Create `.env.local` file in project root:
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**DO NOT commit .env.local to git** (already in .gitignore)

### 3. Test Locally

Run development server:
```bash
npm run dev
```

Open http://localhost:5173 in browser

Test:
- All theme modes (light, dark, auto)
- Responsive design (DevTools mobile emulation)
- Contact form (with valid EmailJS config)
- All navigation links

### 4. Build Locally

```bash
npm run build
```

This runs:
- `tsc -b` - TypeScript compilation
- `vite build` - Creates optimized dist/

Verify no TypeScript errors appear.

### 5. Preview Production Build

```bash
npm run preview
```

Opens preview of production build on http://localhost:4173

## GitHub Setup

### 1. Create Repository

```bash
cd /c/portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

Or push existing repo:
```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### 2. Verify .gitignore

Ensure `.gitignore` contains:
```
.env.local
node_modules
dist
*.local
```

Check files to be committed:
```bash
git status
```

Should NOT include `.env.local` or `node_modules`

## Vercel Deployment

### Option 1: Connect GitHub Repository (Recommended)

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up (can use GitHub login)

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Search and select `portfolio` repository
   - Click "Import"

3. **Configure Environment Variables**
   - In project settings, go to "Environment Variables"
   - Add three variables:
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`
   - Paste your credentials for each
   - Click "Save"

4. **Deploy**
   - Vercel auto-detects Vite project
   - Framework preset: "Vite"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click "Deploy"

5. **Monitor Deployment**
   - Wait for build to complete (usually 1-2 minutes)
   - Check logs for errors
   - Once complete, get deployment URL

### Option 2: Manual Deployment with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts:
# - Link to existing project? (no for first time)
# - Set up and deploy? (yes)
# - Project name: portfolio
# - Framework: vite
# - Output directory: dist
```

## EmailJS Setup (Critical for Contact Form)

### 1. Create EmailJS Account

1. Go to https://www.emailjs.com
2. Sign up with email
3. Verify email
4. Dashboard opens

### 2. Create Email Service

1. In dashboard, go to "Email Services"
2. Click "Add Service"
3. Choose email provider:
   - **Gmail:** Recommended for testing
   - **SMTP:** For custom email
   - **SendGrid/Mailgun:** For production scale
4. Follow setup instructions
5. Note the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
{{from_name}},

{{message}}

---
From: {{from_email}}
Subject: {{subject}}
```

4. Name it clearly (e.g., "Contact Form")
5. Note the **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key

1. Go to "Account" → "API Keys"
2. Copy **Public Key** (starts with `zzz...`)

### 5. Test Email Service

1. Still in EmailJS dashboard
2. Go to "Email Services"
3. Click your service
4. Click "Test" button
5. Send test email
6. Check inbox (may be in spam/promotions)

## Environment Variables

### What Each Variable Does

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service to use | `service_a1b2c3d4e5f6g7h8` |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template for emails | `template_abc123def456` |
| `VITE_EMAILJS_PUBLIC_KEY` | Public key for EmailJS API | `zzz_abc123...xyz` |

### Accessing in Code

```typescript
// src/services/emailService.ts
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
```

### Local Development

Create `.env.local` in project root (never commit):
```
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=zzz_your_public_key_here
```

### Vercel Production

Set in Vercel project settings:
1. Project → Settings
2. Environment Variables
3. Add the three variables
4. Redeploy for changes to take effect

## Custom Domain Setup (Optional)

1. **In Vercel Dashboard**
   - Project → Settings → Domains
   - Add your custom domain
   - Follow DNS setup instructions

2. **Update Domain Provider DNS**
   - Login to domain registrar (GoDaddy, Namecheap, etc.)
   - Find DNS settings
   - Add CNAME record pointing to Vercel
   - Wait 24 hours for propagation

3. **Verify**
   - Check Vercel dashboard for ✓ verification
   - Visit your domain in browser

## Testing Deployment

### 1. Verify Site Works

- [ ] Load site on deployed URL
- [ ] Check all navigation links
- [ ] Test theme toggle (persists on reload)
- [ ] Check responsive design
- [ ] Submit contact form
- [ ] Check email received in inbox
- [ ] Navigate to /#/logs
- [ ] Navigate to /#/settings
- [ ] Download CV
- [ ] View in dark/light/auto mode

### 2. Browser DevTools

- [ ] No console errors
- [ ] No network 404s
- [ ] Assets load from CDN
- [ ] localStorage works (open DevTools → Application → Storage)

### 3. Performance

- [ ] Page load < 3 seconds
- [ ] Use Lighthouse audit (DevTools → Lighthouse)
- [ ] Target: 90+ scores

## Continuous Integration/Deployment

### Automatic Redeployment

Vercel automatically redeploys when you push to `main` branch:

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

→ Vercel detects push
→ Runs build (`npm run build`)
→ Deploys to production automatically

### Preview Deployments

When you create a pull request, Vercel creates a preview URL to test before merging:

```bash
git checkout -b feature/new-section
# Make changes
git push origin feature/new-section
# Create PR on GitHub
```

→ Vercel creates preview deployment
→ Comment in PR with preview URL
→ Test the changes
→ Merge to main when ready

## Monitoring & Logs

### Vercel Deployment Logs

1. Go to Vercel project dashboard
2. Click "Deployments" tab
3. Click recent deployment
4. View build logs
5. Check for errors/warnings

### Contact Form Errors

If emails don't send:
1. Check browser console (DevTools → Console)
2. Look for EmailJS error messages
3. Verify .env variables are set in Vercel
4. Test EmailJS service directly in dashboard
5. Check spam folder for emails

### Performance Monitoring

1. Use Lighthouse: Chrome DevTools → Lighthouse tab
2. Check Vercel Analytics (if enabled)
3. Monitor Core Web Vitals

## Troubleshooting

### Site Returns 404

**Problem:** Everything redirects to 404
**Solution:** Check `vercel.json` has correct SPA fallback:
```json
{"src": "/.*", "dest": "/index.html"}
```

### Contact Form Not Sending

**Problem:** Submit fails or email not received
**Solutions:**
1. Verify EmailJS credentials in Vercel env vars
2. Check EmailJS service is active (EmailJS dashboard)
3. Test template in EmailJS dashboard
4. Check spam folder
5. Check browser console for specific error

### Styling Issues

**Problem:** Dark/light theme not applying
**Solutions:**
1. Clear browser cache (Ctrl+Shift+Del)
2. Check localStorage (DevTools → Application → Storage → localStorage)
3. Verify MUI theme is rendering (inspect element, check inline styles)

### Slow Performance

**Problem:** Site loads slowly
**Solutions:**
1. Optimize images (could add later)
2. Check Lighthouse for suggestions
3. Review bundle size: `npm run build` outputs size info
4. Check Vercel function logs for bottlenecks

## Updating Site After Deployment

### Update Content

Edit data files and push:
```bash
# Edit src/data/projects.ts, src/data/skills.ts, etc.
git add src/data/
git commit -m "Update projects and skills"
git push origin main
```

Vercel auto-redeploys in ~1 minute.

### Update EmailJS Credentials

1. Update .env.local locally for testing
2. Update in Vercel project settings
3. Redeploy:
   - Option A: Push a dummy commit
   - Option B: Click "Redeploy" in Vercel dashboard

### Update Theme Colors

Edit `src/utils/theme.ts`:
```typescript
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#YOUR_HEX_COLOR', // Change blue to your color
    },
    // ...
  },
});
```

Push and Vercel redeploys.

## SEO & Meta Tags

Current meta tags in `index.html`:
```html
<meta name="description" content="ikrigel - Full-Stack Developer & AI Integration Specialist Portfolio" />
<meta name="author" content="ikrigel" />
<meta property="og:title" content="ikrigel - Developer Portfolio" />
```

To update:
1. Edit `index.html`
2. Change meta tags
3. Redeply

## Analytics Setup (Optional Future Enhancement)

To add Google Analytics:
1. Create Google Analytics account
2. Add script in `index.html` head
3. Track user engagement

## Rollback on Issues

If deployment breaks site:

```bash
# Find previous good commit
git log --oneline | head

# Revert to working state
git revert COMMIT_HASH
git push origin main

# Vercel redeploys with previous version
```

Or use Vercel dashboard:
1. Click "Deployments"
2. Find previous working deployment
3. Click "..."  menu
4. Select "Promote to Production"
