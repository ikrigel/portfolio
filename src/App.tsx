import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LoggerProvider } from '@/contexts/LoggerContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { createAutoTheme } from '@/utils/theme';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Resume } from '@/components/sections/Resume';
import { Contact } from '@/components/sections/Contact';
import { LogsViewer } from '@/components/features/LogsViewer';
import { SettingsPanel } from '@/components/features/SettingsPanel';

function MuiThemeWrapper({ children }: { children: ReactNode }) {
  const { themeMode, brightness } = useTheme();

  // Map all three modes through createAutoTheme so cards always respond to brightness
  const effectiveBrightness =
    themeMode === 'light' ? 0.90 :
    themeMode === 'dark'  ? 0.05 :
    brightness;                     // auto → real time-based value

  const muiTheme = createAutoTheme(effectiveBrightness);

  return (
    <div
      style={{
        '--brightness': brightness.toString(),
        '--brightness-percent': `${Math.round(brightness * 100)}%`,
      } as any}
    >
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </div>
  );
}

function SitewideParallax() {
  const [offset, setOffset] = useState(0);
  const { brightness } = useTheme();

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.3);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Overlay opacity: 0.82 at midnight (brightness=0) → 0.45 at noon (brightness=1)
  const overlayOpacity = 0.82 - brightness * 0.37;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url(/pictures/neural-network.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${offset}px)`,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `rgba(8, 8, 12, ${overlayOpacity.toFixed(2)})`,
        transition: 'background 2s ease',
      }} />
    </div>
  );
}

function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SitewideParallax />
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function MainPage() {
  // When returning from logs/settings to main page, scroll to the target section
  useEffect(() => {
    // Check if there's a target section stored in sessionStorage (from navigation)
    const targetSection = sessionStorage.getItem('targetSection');
    if (targetSection) {
      sessionStorage.removeItem('targetSection');
      const timer = setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Update the URL hash for history
          window.history.replaceState(null, '', `#${targetSection}`);
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Check if there's a hash in the URL
      const hash = window.location.hash.slice(1);
      if (hash) {
        const timer = setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return () => clearTimeout(timer);
      } else {
        // If no target, scroll to top
        window.scrollTo(0, 0);
      }
    }
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Resume />
      <Contact />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="logs" element={<LogsViewer />} />
        <Route path="settings" element={<SettingsPanel />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <LoggerProvider>
      <SettingsProvider>
        <ThemeProvider>
          <MuiThemeWrapper>
            <HashRouter>
              <AppRoutes />
            </HashRouter>
          </MuiThemeWrapper>
        </ThemeProvider>
      </SettingsProvider>
    </LoggerProvider>
  );
}
