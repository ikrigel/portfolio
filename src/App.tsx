import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LoggerProvider } from '@/contexts/LoggerContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { lightTheme, darkTheme, createAutoTheme } from '@/utils/theme';
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

  // For auto mode, interpolate colors based on brightness throughout the day
  // For manual modes, use fixed themes
  const muiTheme = themeMode === 'auto'
    ? createTheme(createAutoTheme(brightness))
    : themeMode === 'dark'
      ? darkTheme
      : lightTheme;

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

function MainLayout() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function MainPage() {
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
