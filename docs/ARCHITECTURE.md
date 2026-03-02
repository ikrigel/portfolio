# ARCHITECTURE.md - System Design Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      React Application                      │
│  (HashRouter - Single Page App with Hash-based Navigation)  │
└────────────────────┬────────────────────────────────────────┘
                     │
      ┌──────────────┼──────────────┐
      │              │              │
┌─────▼─────┐  ┌────▼─────┐  ┌────▼──────┐
│  Logger   │  │ Settings │  │   Theme   │
│ Context   │  │ Context  │  │ Context   │
└─────┬─────┘  └────┬─────┘  └────┬──────┘
      │             │             │
      └─────────────┼─────────────┘
                    │
            ┌───────▼────────┐
            │  MUI Theme &   │
            │  CssBaseline   │
            └────────────────┘
```

## Provider Hierarchy

```
App Root
├── LoggerProvider (useLogger hook)
│   ├── SettingsProvider (useSettings hook)
│   │   ├── ThemeProvider (useTheme hook)
│   │   │   ├── MuiThemeWrapper
│   │   │   │   ├── MuiThemeProvider (MUI's theme provider)
│   │   │   │   ├── CssBaseline (MUI CSS reset)
│   │   │   │   └── HashRouter
│   │   │   │       └── Routes/Outlet
```

## Data Flow

### User Interaction Flow
```
User Action (e.g., toggle theme)
      ↓
Component Hook (useTheme())
      ↓
Context Method (setThemeMode)
      ↓
SettingsContext.updateSettings({theme: 'dark'})
      ↓
storageService.setItem('settings', {...})
      ↓
localStorage.setItem('portfolio_settings', JSON.stringify(...))
      ↓
Components re-render with new theme
      ↓
MUI ThemeProvider switches theme objects
      ↓
CSS variables/styles update (MUI's CssBaseline applies)
```

### Auto-Theme Resolution
```
App Mount
  ↓
ThemeContext useEffect (when themeMode === 'auto')
  ↓
resolveAutoTheme() → hour < 12 ? 'light' : 'dark'
  ↓
setResolvedTheme(theme)
  ↓
setInterval(resolve, 5 * 60 * 1000) [5 min check]
  ↓
Component unmount
  ↓
clearInterval cleanup
```

### Logging Pipeline
```
Component Action
  ↓
log('verbose', 'action_name', 'optional details')
  ↓
LoggerContext.log() checks shouldLog(level, currentLogLevel)
  ↓
If should log:
  ├─ appendLog() creates LogEntry with timestamp/userAgent/page
  │   ↓
  │   loadStore() from portfolio_logs
  │   ↓
  │   entries.unshift(newEntry) [newest first]
  │   ↓
  │   trim to 1000 max entries
  │   ↓
  │   saveStore() to portfolio_logs
  │
  └─ If should NOT log:
     └─ Silent (no action)
```

### Contact Form Draft Persistence
```
ContactForm Mount
  ↓
Check settings.contactFormData exists?
  ├─ Yes: Restore form values & show "Draft restored" Snackbar
  └─ No: Show empty form

User Types
  ↓
Form onChange updates local state
  ↓
useEffect with 5s debounce
  ↓
updateSettings({contactFormData: {name, email, subject, message, savedAt}})
  ↓
Auto-saved to portfolio_settings

Form Submit
  ↓
validateContactForm()
  ├─ Errors: Show error Snackbar, keep draft
  └─ Valid: sendContactEmail()
      ↓
      emailService.sendContactEmail(payload)
      ↓
      emailjs.send(SERVICE_ID, TEMPLATE_ID, payload)
      ↓
      Success: Clear draft, show success Snackbar
      ↓
      Error: Show error Snackbar, keep draft for retry
```

## Component Hierarchy

### Main Page Structure
```
App (providers at top level)
  │
  └── HashRouter
      └── Routes
          └── /
              └── MainLayout
                  ├── Header
                  │   ├── Navigation (desktop)
                  │   ├── ThemeSwitcher
                  │   ├── Hamburger IconButton
                  │   └── MobileMenu (drawer)
                  │
                  ├── MainPage (Outlet)
                  │   ├── Hero (section#hero)
                  │   ├── About (section#about)
                  │   ├── Experience (section#experience)
                  │   ├── Projects (section#projects)
                  │   ├── Resume (section#resume)
                  │   └── Contact (section#contact)
                  │
                  └── Footer
                      ├── Copyright
                      ├── Social Links
                      └── Logs/Settings Links

Alternative Routes:
  /logs → LogsViewer (full page)
  /settings → SettingsPanel (full page)
```

## State Management Strategy

### Immutability Principle
All state updates create new objects:
```typescript
// Bad
settings.theme = 'dark';
setSettings(settings);

// Good
setSettings({...settings, theme: 'dark'});
```

### State Update Chains
```
User Action
  ↓
Component setState()
  ↓
useEffect dependency triggers
  ↓
Context.updateSettings() called
  ↓
Multiple components subscribed to SettingsContext
  │   ↓ (ThemeContext reads settings.theme)
  │   ↓ (LoggerContext reads settings.logLevel)
  │
  └── All subscribers re-render with new data
```

## Routing Strategy

### Hash-based Routes
- **Why:** Works on any static host (Vercel, GitHub Pages, local file://)
- **Structure:** `/#/route` format
- **Main sections:** Anchors within single page (`#hero`, `#about`, `#contact`)
- **Special pages:** `/logs` (LogsViewer), `/settings` (SettingsPanel)

### Scroll Navigation
```
User clicks "About" button → href="#about"
  ↓
Browser scrolls to <section id="about">
  ↓
useScrollSpy detects intersection
  ↓
Navigation highlights "About" item (active state)
```

## Storage Architecture

### localStorage Schema
```
Browser localStorage (global scope)
├── portfolio_settings (AppSettings JSON)
│   ├── theme, logLevel, animationsEnabled, emailNotifications
│   ├── lastVisitedSection
│   └── contactFormData (with savedAt timestamp)
│
└── portfolio_logs (LogStore JSON)
    ├── entries (array, newest first, max 1000)
    │   └── LogEntry[] (timestamp, level, action, details, page, userAgent)
    └── maxEntries (1000)
```

### Durability
- localStorage is domain-scoped (survives page refreshes)
- NOT synced across tabs automatically (separate instances)
- Limited to ~5-10MB per domain
- All data stored as JSON strings

## Theme System Architecture

### MUI Theme Objects
```
lightTheme (createTheme)
├── palette.mode: 'light'
├── palette.primary: {main: '#1976d2', ...} (blue)
├── palette.secondary: {main: '#9c27b0'} (purple)
└── palette.background: {default: '#f5f5f5', paper: '#ffffff'}

darkTheme (createTheme)
├── palette.mode: 'dark'
├── palette.primary: {main: '#00bcd4'} (cyan)
├── palette.secondary: {main: '#ce93d8'} (light purple)
└── palette.background: {default: '#0a0a0a', paper: '#1a1a1a'}
```

### Theme Application
```
ThemeContext tracks themeMode ('light' | 'dark' | 'auto')
  ↓
useEffect computes resolvedTheme
  ├─ If 'light': resolvedTheme = 'light'
  ├─ If 'dark': resolvedTheme = 'dark'
  └─ If 'auto': resolvedTheme = hour < 12 ? 'light' : 'dark'
      └─ Checks every 5 minutes
  ↓
MuiThemeWrapper reads resolvedTheme
  ↓
Selects lightTheme or darkTheme
  ↓
Passes to MuiThemeProvider
  ↓
All MUI components styled per theme
  ↓
CssBaseline applies background color to document
```

## Performance Optimizations

### Code Splitting
Vite's `manualChunks` splits bundles:
```
vendor.js (react, react-dom)
mui.js (@mui/material, @mui/icons-material)
router.js (react-router-dom)
main.js (application code)
```

### Lazy Rendering
- ProjectCard components rendered in grid via `.map()`
- LogsViewer table uses virtualization in future
- Intersection Observer for scroll spy (efficient)

### Storage Access
- getItem/setItem wrapped with try-catch (safe failures)
- No excessive localStorage polling
- Auto-save debounced to 5 seconds

## Error Handling

### Storage Failures
```typescript
try {
  localStorage.setItem(key, JSON.stringify(value));
} catch {
  console.error('Failed to save'); // quota exceeded
  // Graceful fallback: continue without persistence
}
```

### EmailJS Failures
```typescript
try {
  await sendContactEmail(payload);
} catch (error) {
  setStatus('error');
  // Show user-friendly error message
  // Keep draft in localStorage for retry
}
```

### Missing Configuration
```typescript
if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
  throw new Error('EmailJS is not configured...');
  // User sees: helpful error in Snackbar
}
```

## Security Considerations

### Client-Side Storage
- localStorage is NOT encrypted
- Sensitive data (passwords, API keys) NEVER stored
- Contact form data is user's own data (safe to store)

### EmailJS
- Service ID/Template ID/Public Key are client-side (not secret)
- Actual email sending happens on EmailJS servers
- No backend required (serverless approach)

### Input Validation
- Contact form validated client-side (email regex, non-empty checks)
- NOT a security boundary (server-side validation would be needed for real app)
- XSS prevented by React's default escaping

## Deployment Architecture

### Vercel SPA Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    {
      "src": "/assets/.*",
      "headers": {"Cache-Control": "public, max-age=31536000, immutable"}
    },
    {"src": "/.*", "dest": "/index.html"}
  ]
}
```

This ensures:
1. All requests (except /assets/...) go to index.html
2. HashRouter handles routing client-side
3. Assets are cached aggressively (1 year)

### Build Output
```
dist/
├── index.html (entry point)
├── assets/
│   ├── vendor-[hash].js
│   ├── mui-[hash].js
│   ├── router-[hash].js
│   ├── main-[hash].js
│   └── [hash].css
└── favicon.svg
```

## Monitoring & Analytics Hooks

### Logging Integration Points
```
Every significant user action is logged:
├── Navigation: log('verbose', 'page_view', ...)
├── Theme change: log('info', 'theme_changed', ...)
├── Form draft save: log('verbose', 'contact_form_autosave', ...)
├── Form submission: log('info', 'contact_form_submit', ...)
├── Errors: log('error', 'action_name', errorMessage)
└── Settings changes: log('info', 'settings_updated', ...)

All logs stored in portfolio_logs for debugging & analytics
```

## Testing Strategy

### Manual Testing Flow
1. Theme toggle (light → dark → auto)
2. Auto-theme time-based switching
3. Responsive breakpoints (320px, 768px, 1024px, 1920px)
4. Contact form draft persistence
5. Navigation scroll spy highlighting
6. Log filtering & export
7. Settings import/export

### Browser DevTools
- LocalStorage inspector for data verification
- Network tab for EmailJS requests
- Console for error logging
- Performance profiler for scroll handling
