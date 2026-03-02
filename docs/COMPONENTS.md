# COMPONENTS.md - Component Documentation

## Layout Components

### Header
**Path:** `src/components/layout/Header.tsx`
**Purpose:** Main application header with navigation, theme switcher, and mobile menu toggle

**Props:** None (uses context hooks internally)

**Key Features:**
- Sticky positioning with elevation on scroll
- Responsive: Navigation hidden on mobile (<md), hamburger shown
- Integrates ThemeSwitcher for easy mode toggling
- Logs mobile menu open/close events

**Dependencies:**
- `useScrollSpy` for scroll listener
- `useLogger` for logging
- `Navigation` component
- `MobileMenu` component
- `ThemeSwitcher` component

**Usage:**
```tsx
<Header />
```

---

### Navigation
**Path:** `src/components/layout/Navigation.tsx`
**Purpose:** Desktop horizontal navigation bar with active section highlighting

**Props:** None

**Key Features:**
- Shows only on md breakpoint and up
- Uses `useScrollSpy` to highlight active section
- Links are hash-based anchors (#hero, #about, etc.)

**Dependencies:**
- `useScrollSpy` hook
- NAV_ITEMS from constants

**Usage:**
```tsx
<Navigation />
```

---

### MobileMenu
**Path:** `src/components/layout/MobileMenu.tsx`
**Purpose:** Mobile navigation drawer with menu items, theme switcher, and settings

**Props:**
- `open: boolean` - Whether drawer is open
- `onClose: () => void` - Callback to close drawer

**Key Features:**
- MUI Drawer component (temporary, right-anchored)
- Contains full navigation + ThemeSwitcher + Settings/Logs links
- Auto-closes on navigation click

**Dependencies:**
- `ThemeSwitcher` component
- NAV_ITEMS from constants

**Usage:**
```tsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
<MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
```

---

### Footer
**Path:** `src/components/layout/Footer.tsx`
**Purpose:** Application footer with social links and navigation

**Props:** None

**Key Features:**
- Social links: GitHub, LinkedIn, Email
- Copyright year auto-calculated
- Links to Logs and Settings pages
- Responsive 2-column layout

**Dependencies:**
- PERSONAL_INFO from constants

**Usage:**
```tsx
<Footer />
```

---

## Feature Components

### ThemeSwitcher
**Path:** `src/components/features/ThemeSwitcher.tsx`
**Purpose:** Button to cycle between light, dark, and auto theme modes

**Props:** None

**Key Features:**
- Cycles light → dark → auto → light
- Icons change per mode (LightMode, DarkMode, BrightnessAuto)
- Tooltip shows next mode label
- Logs theme changes

**Dependencies:**
- `useTheme` hook
- `useLogger` hook
- MUI icons

**Usage:**
```tsx
<ThemeSwitcher />
```

---

### ContactForm
**Path:** `src/components/features/ContactForm.tsx`
**Purpose:** Contact form with validation, auto-save, and email sending

**Props:** None (uses context hooks)

**Key Features:**
- Form fields: name, email, subject, message
- Real-time validation with error messages
- Auto-save draft every 5 seconds
- Restores draft on mount
- EmailJS integration
- Loading state during submission
- Success/error notifications

**Dependencies:**
- `useSettings` hook for draft persistence
- `useLogger` hook for logging
- `validateContactForm` utility
- `sendContactEmail` service
- `Notification` component

**Usage:**
```tsx
<ContactForm />
```

---

### LogsViewer
**Path:** `src/components/features/LogsViewer.tsx`
**Purpose:** Full-page view of application logs with filtering and export

**Props:** None

**Key Features:**
- Table display: timestamp, level, action, details, page
- Filter by level: All, Verbose, Info, Error
- Search by action/details text
- Export logs as JSON
- Clear all logs with confirmation dialog
- Responsive table design

**Dependencies:**
- `useLogger` hook
- MUI Table components

**Usage:**
```tsx
// Routed as /#/logs
<Route path="logs" element={<LogsViewer />} />
```

---

### SettingsPanel
**Path:** `src/components/features/SettingsPanel.tsx`
**Purpose:** Settings page for theme, logging, and data management

**Props:** None

**Key Features:**
- Theme selector (light, dark, auto)
- Log level selector (none, error, info, verbose)
- Animation toggle
- Email notifications toggle
- Export settings to JSON
- Import settings from JSON
- Reset to defaults with confirmation

**Dependencies:**
- `useSettings` hook
- `useLogger` hook

**Usage:**
```tsx
// Routed as /#/settings
<Route path="settings" element={<SettingsPanel />} />
```

---

## Section Components

### Hero
**Path:** `src/components/sections/Hero.tsx`
**Purpose:** Full-height hero section with introduction and call-to-action

**Props:** None

**Key Features:**
- Animated avatar (gradient background)
- Name and tagline
- Professional introduction
- GitHub and LinkedIn buttons
- Bouncing chevron animation
- Responsive text sizing

**Usage:**
```tsx
<Hero />
```

---

### About
**Path:** `src/components/sections/About.tsx`
**Purpose:** About section with bio and statistics

**Props:** None

**Key Features:**
- Bio paragraph (left column)
- 4 stat cards (right column): Projects, Repos, Years, Technologies
- Hover effect on stat cards
- 2-column layout on desktop, single on mobile

**Usage:**
```tsx
<About />
```

---

### Experience
**Path:** `src/components/sections/Experience.tsx`
**Purpose:** Timeline of work experience and background

**Props:** None

**Key Features:**
- MUI Timeline component
- Experience entries with company, role, period
- Bullet-point descriptions
- Technology tags per experience
- Alternating left-right layout

**Dependencies:**
- MUI Lab Timeline components
- EXPERIENCE data

**Usage:**
```tsx
<Experience />
```

---

### ProjectCard
**Path:** `src/components/sections/ProjectCard.tsx`
**Purpose:** Reusable card component for displaying a single project

**Props:**
```typescript
{
  project: Project  // Project object from data
}
```

**Key Features:**
- Project title and featured badge
- Description
- Technology tags (filled chips)
- GitHub code link
- Live demo link (if available)
- Hover elevation effect

**Usage:**
```tsx
<ProjectCard project={project} />
```

---

### Projects
**Path:** `src/components/sections/Projects.tsx`
**Purpose:** Grid of projects with category filtering

**Props:** None

**Key Features:**
- Responsive grid: 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
- Filter by category: All, Web, Automation, AI, Tools
- Renders ProjectCard components
- Logs filter changes

**Dependencies:**
- ProjectCard component
- PROJECTS data
- `useLogger` hook

**Usage:**
```tsx
<Projects />
```

---

### Resume
**Path:** `src/components/sections/Resume.tsx`
**Purpose:** Resume/CV section with summary, skills, and achievements

**Props:** None

**Key Features:**
- Professional summary
- Key skills (4 categories from SKILL_CATEGORIES)
- Key achievements (5 bullet points)
- CV download button
- Clean card-based layout

**Dependencies:**
- SKILL_CATEGORIES data

**Usage:**
```tsx
<Resume />
```

---

### Contact
**Path:** `src/components/sections/Contact.tsx`
**Purpose:** Contact section with form and email display

**Props:** None

**Key Features:**
- Heading and description
- Email display card
- Contact form wrapper
- Email link

**Dependencies:**
- ContactForm component
- PERSONAL_INFO from constants

**Usage:**
```tsx
<Contact />
```

---

## UI Components

### LoadingSpinner
**Path:** `src/components/ui/LoadingSpinner.tsx`
**Purpose:** Centered loading indicator

**Props:**
```typescript
{
  size?: number;           // diameter in pixels (default 40)
  fullHeight?: boolean;    // min-height 100vh if true
}
```

**Features:**
- MUI CircularProgress
- Centered vertically and horizontally
- Optional full-height viewport

**Usage:**
```tsx
<LoadingSpinner size={50} fullHeight={true} />
```

---

### Notification
**Path:** `src/components/ui/Notification.tsx`
**Purpose:** Snackbar notification wrapper

**Props:**
```typescript
{
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  autoHideDuration?: number;  // milliseconds (default 6000)
}
```

**Features:**
- MUI Snackbar + Alert
- Auto-dismisses after duration
- Bottom-left positioning
- Click to close immediately

**Usage:**
```tsx
const [notificationOpen, setNotificationOpen] = useState(false);

<Notification
  open={notificationOpen}
  message="Success!"
  severity="success"
  onClose={() => setNotificationOpen(false)}
/>
```

---

## Component Composition Pattern

All components follow these patterns:

### Props Typing
```typescript
interface ComponentProps {
  prop1: string;
  prop2?: boolean;
}

export function Component({ prop1, prop2 = false }: ComponentProps) {
  // ...
}
```

### Hooks Usage
- Components that need data use hooks (useTheme, useSettings, useLogger)
- Hooks are called at top level before returns
- Conditional hooks are avoided

### CSS-in-JS (MUI sx prop)
```typescript
<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  // Responsive breakpoints
  fontSize: { xs: '1rem', md: '1.2rem' }
}}>
```

### Responsive Design
- Use `display: { xs: 'block', md: 'none' }` for breakpoints
- xs: <600px (mobile), md: ≥900px (desktop), lg: ≥1200px
- Stack/Grid for layout responsiveness

## Component Size Limits
All components kept under 250 lines to maintain readability and modularity.
