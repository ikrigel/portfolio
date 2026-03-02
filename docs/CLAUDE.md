# CLAUDE.md - Portfolio Project Context

## Project Overview
Professional portfolio website showcasing ikrigel as a Full-Stack Developer & AI Integration Specialist. Built with React 18, TypeScript, Vite, Material-UI v5, and React Router v6. Deployed on Vercel.

## Architecture
- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Library:** Material-UI v5
- **Routing:** React Router v6 (HashRouter for SPA)
- **State Management:** React Context API (3 contexts)
- **Storage:** localStorage with JSON serialization
- **Email:** EmailJS for client-side email sending

## Core Systems

### 1. Theme System
- **File:** `src/contexts/ThemeContext.tsx`
- **Modes:** light, dark, auto
- **Auto-theme Logic:**
  - Hour < 12: light mode
  - Hour >= 12: dark mode
  - Updates every 5 minutes via setInterval
- **Persistence:** Saved in `portfolio_settings` localStorage
- **Themes:** `src/utils/theme.ts` (lightTheme with blue/purple, darkTheme with cyan/purple)

### 2. Logging System
- **Files:**
  - `src/services/logService.ts` - Core log operations
  - `src/contexts/LoggerContext.tsx` - Context & hooks
  - `src/components/features/LogsViewer.tsx` - UI for logs
- **Levels:** verbose, info, error, none
- **Storage:** `portfolio_logs` - JSON array (max 1000 entries)
- **Features:** Filter by level, search, export as JSON, auto-rotate

### 3. Settings Management
- **File:** `src/contexts/SettingsContext.tsx`
- **Storage Key:** `portfolio_settings`
- **Fields:** theme, logLevel, animationsEnabled, emailNotifications, lastVisitedSection, contactFormData
- **Default:** `src/types/settings.ts` - DEFAULT_SETTINGS constant
- **Panel:** `src/components/features/SettingsPanel.tsx`

### 4. Contact Form
- **File:** `src/components/features/ContactForm.tsx`
- **Features:**
  - Form validation via `src/utils/validators.ts`
  - Auto-save draft every 5 seconds to settings
  - Restore draft on mount if available
  - EmailJS integration for sending
  - Snackbar notifications for success/error
- **Email Service:** `src/services/emailService.ts`

## localStorage Schema

### portfolio_settings
```json
{
  "theme": "auto" | "light" | "dark",
  "logLevel": "verbose" | "info" | "error" | "none",
  "animationsEnabled": boolean,
  "emailNotifications": boolean,
  "lastVisitedSection": string,
  "contactFormData": {
    "name": string,
    "email": string,
    "subject": string,
    "message": string,
    "savedAt": "ISO 8601"
  } | null
}
```

### portfolio_logs
```json
{
  "entries": [
    {
      "id": "uuid",
      "timestamp": "ISO 8601",
      "level": "verbose" | "info" | "error",
      "action": "string",
      "details": "string | undefined",
      "userAgent": "string",
      "page": "string (hash route)"
    }
  ],
  "maxEntries": 1000
}
```

## Environment Variables (.env.local)
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Key File Paths

### Type Definitions
- `src/types/index.ts` - Shared types & interfaces
- `src/types/logs.ts` - LogEntry, LogLevel, LogStore
- `src/types/settings.ts` - AppSettings, ThemeMode, DEFAULT_SETTINGS

### Services (No React Dependencies)
- `src/services/storageService.ts` - localStorage wrapper (generic)
- `src/services/logService.ts` - appendLog, getLogs, clearLogs, exportLogsAsJSON
- `src/services/emailService.ts` - sendContactEmail (EmailJS wrapper)

### Contexts (React State Management)
- `src/contexts/LoggerContext.tsx` - useLogger hook, LoggerProvider
- `src/contexts/SettingsContext.tsx` - useSettings hook, SettingsProvider
- `src/contexts/ThemeContext.tsx` - useTheme hook, ThemeProvider (auto-mode logic)

### Hooks
- `src/hooks/useLocalStorage.ts` - Generic localStorage hook
- `src/hooks/useLogger.ts` - Re-export of useLogger from LoggerContext
- `src/hooks/useAutoTheme.ts` - Standalone auto-theme resolution
- `src/hooks/useScrollSpy.ts` - Detect active section via IntersectionObserver

### Components

#### Layout (`src/components/layout/`)
- `Header.tsx` - AppBar with logo, navigation, theme switcher, hamburger menu
- `Navigation.tsx` - Desktop nav with scroll spy active highlighting
- `MobileMenu.tsx` - Drawer with nav items, theme switcher, settings link
- `Footer.tsx` - Social links, copyright, logs/settings links

#### Features (`src/components/features/`)
- `ThemeSwitcher.tsx` - Cycles light → dark → auto
- `ContactForm.tsx` - Form with validation, auto-save, email sending
- `LogsViewer.tsx` - Table with filtering, search, export, clear
- `SettingsPanel.tsx` - Form controls, export/import/reset

#### Sections (`src/components/sections/`)
- `Hero.tsx` - Full-height intro with name, tagline, GitHub/LinkedIn links
- `About.tsx` - Bio text + 4-stat cards
- `Experience.tsx` - Timeline of work experience
- `ProjectCard.tsx` - Reusable project card component
- `Projects.tsx` - Grid of project cards with category filter
- `Resume.tsx` - Summary, skills, achievements, CV download
- `Contact.tsx` - Contact form wrapper

#### UI (`src/components/ui/`)
- `LoadingSpinner.tsx` - MUI CircularProgress centered
- `Notification.tsx` - MUI Snackbar + Alert wrapper

## Data Files
- `src/data/projects.ts` - PROJECTS array (12 projects)
- `src/data/skills.ts` - SKILL_CATEGORIES array (8 categories)
- `src/data/experience.ts` - EXPERIENCE array

## Constants & Utilities
- `src/utils/constants.ts` - STORAGE_KEYS, PERSONAL_INFO, NAV_ITEMS, timings
- `src/utils/validators.ts` - validateContactForm, isValidEmail, hasErrors
- `src/utils/theme.ts` - lightTheme, darkTheme (MUI createTheme objects)

## Development Workflow

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Runs on http://localhost:5173

### Build for Production
```bash
npm run build
```
Outputs to `dist/` directory. Verifies TypeScript compilation with `tsc -b`.

### Preview Production Build
```bash
npm run preview
```

## Common Tasks

### Adding a New Project
1. Edit `src/data/projects.ts`
2. Add new Project object to PROJECTS array
3. Include id, title, description, technologies, githubUrl, and optionally liveUrl

### Customizing Themes
1. Edit `src/utils/theme.ts`
2. Modify `lightTheme` or `darkTheme` createTheme objects
3. Changes apply globally via MUI ThemeProvider

### Changing Log Level Display
1. Edit `src/components/features/LogsViewer.tsx`
2. Modify LEVEL_COLORS map to change chip colors by level

### Adding New Settings
1. Update `AppSettings` interface in `src/types/settings.ts`
2. Add default value to `DEFAULT_SETTINGS`
3. Access via `useSettings()` hook in components

## Important Notes

### Provider Nesting Order
Correct order (outer to inner):
1. LoggerProvider (reads settings directly to avoid circular dep)
2. SettingsProvider
3. ThemeProvider (custom context)
4. MuiThemeWrapper (renders MUI's ThemeProvider)
5. HashRouter

### Auto-Theme Interval Management
ThemeContext's useEffect with `setInterval` MUST clear the interval on unmount to prevent memory leaks. See the cleanup function that calls `clearInterval(id)`.

### Hash-based Routing
All pages use hash routes (#/logs, #/settings, #/about, etc.). The main portfolio is a single-page with anchor IDs (hero, about, experience, etc.) for scroll sections.

### EmailJS Configuration
- Requires Service ID, Template ID, and Public Key in .env.local
- Init is called once at import time in emailService.ts
- Fallback error message if keys are missing

## Testing Checklist
- [ ] All three theme modes work (light, dark, auto)
- [ ] Auto theme updates every 5 minutes
- [ ] Hamburger menu appears on mobile (<768px)
- [ ] All sections scroll smoothly
- [ ] Contact form saves draft to localStorage
- [ ] Contact form restores draft on reload
- [ ] Settings persist across reloads
- [ ] Logs capture events with correct levels
- [ ] Logs can be filtered by level and searched
- [ ] Logs can be exported as JSON
- [ ] All navigation links work
- [ ] Responsive at 320px, 768px, 1024px, 1920px breakpoints

## Future Enhancements
- Add progress indicator for page scrolling
- Implement service worker for offline functionality
- Add more granular animation controls
- Export/import full site data including logs
- Add dark mode system preferences detection
- Implement blog/articles section
- Add syntax highlighting for code snippets
- Integrate Google Analytics placeholder
