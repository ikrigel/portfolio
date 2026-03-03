# Portfolio Website

A modern, production-ready portfolio website showcasing **ikrigel** as a Full-Stack Developer & AI Integration Specialist.

🔗 **Live:** [View Portfolio](https://portfolio-ikrigel.vercel.app)

## ✨ Features

### Core Features
- 🎨 **Three Theme Modes:** Light, Dark, and Auto (time-based)
- 📱 **Fully Responsive:** Optimized for mobile, tablet, and desktop
- 🔧 **Smooth Navigation:** Hash-based routing with scroll spy
- 📝 **Contact Form:** Email integration with auto-save drafts
- 📊 **Event Logging:** Comprehensive client-side activity tracking
- ⚙️ **Settings Panel:** Customizable theme, logging, and preferences
- 💾 **Data Persistence:** localStorage-based settings and logs
- 🚀 **Production Ready:** TypeScript, Vite, MUI with optimized build

### Sections
- **Hero:** Full-screen introduction with social links
- **About:** Biography with key statistics
- **Experience:** Timeline of professional background
- **Projects:** Filterable grid of 12+ featured projects
- **Resume:** Professional summary, skills, and achievements
- **Contact:** Email contact form with validation

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite |
| **UI Library** | Material-UI v5 |
| **Routing** | React Router v6 (HashRouter) |
| **Styling** | MUI Theme System, sx prop |
| **State** | React Context API |
| **Storage** | Browser localStorage |
| **Email** | EmailJS |
| **Icons** | @mui/icons-material |
| **Deployment** | Vercel |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ikrigel/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create .env.local with EmailJS credentials
cat > .env.local << EOF
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
EOF

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build      # Build optimized bundle
npm run preview    # Preview production build locally
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── layout/         # Header, Footer, Navigation
│   │   ├── sections/       # Page sections (Hero, About, etc.)
│   │   ├── features/       # Feature components (ContactForm, etc.)
│   │   └── ui/             # Reusable UI components
│   ├── contexts/           # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── services/           # Business logic (email, storage, logging)
│   ├── utils/              # Utilities (validators, theme, constants)
│   ├── types/              # TypeScript type definitions
│   ├── data/               # Static data (projects, skills, experience)
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── docs/                   # Documentation
│   ├── CLAUDE.md          # AI context documentation
│   ├── ARCHITECTURE.md    # System design
│   ├── COMPONENTS.md      # Component docs
│   └── DEPLOYMENT.md      # Deployment guide
├── public/                # Static assets
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## 🎨 Theme System

The portfolio supports three theme modes:

### Light Mode ☀️
- Clean white backgrounds with dark text
- Blue and purple accents

### Dark Mode 🌙
- Dark backgrounds with light text
- Cyan and light purple accents

### Auto Mode 🕐
- Time-based: Light (00:00-12:00) → Dark (12:00-24:00)
- Updates automatically every 5 minutes

## 📊 Features in Detail

### Contact Form
- Real-time validation
- Auto-saves draft every 5 seconds
- Sends emails via EmailJS
- Success/error notifications

### Event Logging
- View logs at `/#/logs`
- Filter by level: verbose, info, error
- Export as JSON
- Adjustable log level in settings

### Settings Panel
- Customize theme, logging, notifications
- Export/import settings as JSON
- Reset to defaults

## 🚀 Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

### Deploy to Vercel (Quick)

```bash
# Push to GitHub
git push origin main

# Connect to Vercel at vercel.com
# Add environment variables:
# VITE_EMAILJS_SERVICE_ID
# VITE_EMAILJS_TEMPLATE_ID
# VITE_EMAILJS_PUBLIC_KEY
```

## 📚 Documentation

- **[CLAUDE.md](docs/CLAUDE.md)** - Technical context for AI assistants
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System design
- **[COMPONENTS.md](docs/COMPONENTS.md)** - Component reference
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Detailed deployment guide

## 👤 About

**ikrigel** - Full-Stack Developer & AI Integration Specialist

- 🔗 **GitHub:** [@ikrigel](https://github.com/ikrigel)
- 💼 **LinkedIn:** [ikrigel](https://linkedin.com/in/ikrigel)
- ✉️ **Email:** ikrigel@gmail.com
- 📍 **Location:** Ramat Zvi, Israel, EMEA

**50+ projects delivered**. Passionate about clean code, modern development, and AI integration.

---

**Built with React, TypeScript & ❤️ in 2026**
