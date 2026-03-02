import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

/**
 * Interpolate between two colors based on a 0-1 factor
 * @param colorA - Starting color (hex)
 * @param colorB - Ending color (hex)
 * @param factor - 0 to 1, where 0 is colorA and 1 is colorB
 */
function interpolateColor(colorA: string, colorB: string, factor: number): string {
  // Convert hex to RGB
  const rgbA = parseInt(colorA.slice(1), 16);
  const rgbB = parseInt(colorB.slice(1), 16);

  const aR = (rgbA >> 16) & 255;
  const aG = (rgbA >> 8) & 255;
  const aB = rgbA & 255;

  const bR = (rgbB >> 16) & 255;
  const bG = (rgbB >> 8) & 255;
  const bB = rgbB & 255;

  const r = Math.round(aR + (bR - aR) * factor);
  const g = Math.round(aG + (bG - aG) * factor);
  const b = Math.round(aB + (bB - aB) * factor);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * Create a theme that interpolates between light and dark based on brightness (0-1)
 * brightness: 0 = dark, 0.5 = neutral, 1 = light
 */
export function createAutoTheme(brightness: number): ThemeOptions {
  // Light theme colors
  const lightPrimary = '#1976d2';
  const lightSecondary = '#9c27b0';
  const lightBg = '#ffffff';
  const lightBgDefault = '#f5f5f5';

  // Dark theme colors
  const darkPrimary = '#00bcd4';
  const darkSecondary = '#ce93d8';
  const darkBg = '#1a1a1a';
  const darkBgDefault = '#0a0a0a';

  // Interpolate based on brightness: 0 = dark, 1 = light
  const primary = interpolateColor(darkPrimary, lightPrimary, brightness);
  const secondary = interpolateColor(darkSecondary, lightSecondary, brightness);
  const bg = interpolateColor(darkBg, lightBg, brightness);
  const bgDefault = interpolateColor(darkBgDefault, lightBgDefault, brightness);

  return {
    palette: {
      mode: brightness < 0.5 ? 'dark' : 'light',
      primary: { main: primary },
      secondary: { main: secondary },
      background: {
        default: bgDefault,
        paper: bg,
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 500 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', borderRadius: 8 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 12 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 6 },
        },
      },
    },
  };
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6 },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4',
      light: '#4dd0e1',
      dark: '#0097a7',
    },
    secondary: {
      main: '#ce93d8',
      light: '#e1bee7',
      dark: '#ab47bc',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6 },
      },
    },
  },
});
