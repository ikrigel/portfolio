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

const sharedComponents = {
  MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 8 } } },
  MuiCard: { styleOverrides: { root: { borderRadius: 12, backgroundColor: '#1a1f2e' } } },
  MuiPaper: { styleOverrides: { root: { backgroundColor: '#1a1f2e' } } },
  MuiChip: { styleOverrides: { root: { borderRadius: 6 } } },
} as const;

const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontWeight: 700 },
  h2: { fontWeight: 600 },
  h3: { fontWeight: 600 },
  h4: { fontWeight: 600 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 500 },
} as const;

/**
 * Create a theme that interpolates accent colors based on brightness (0-1)
 * Cards always use dark backgrounds; only primary/secondary colors change.
 */
export function createAutoTheme(brightness: number): ThemeOptions {
  // Interpolate accent colors between dark cyan and light blue based on brightness
  const primary = interpolateColor('#00bcd4', '#1976d2', brightness);
  const secondary = interpolateColor('#ce93d8', '#9c27b0', brightness);

  return {
    palette: {
      mode: 'dark',  // Always dark so text is readable on dark card backgrounds
      primary: { main: primary },
      secondary: { main: secondary },
      background: {
        default: 'transparent',
        paper: '#1a1f2e',   // Fixed dark card background for all brightness levels
      },
    },
    typography,
    components: sharedComponents,
  };
}

export const lightTheme = createTheme({
  palette: {
    mode: 'dark',           // Always dark mode so text is white on dark cards
    primary: {
      main: '#42a5f5',
      light: '#80d4ff',
      dark: '#1976d2',
    },
    secondary: {
      main: '#ce93d8',
      light: '#e1bee7',
      dark: '#ab47bc',
    },
    background: {
      default: 'transparent',
      paper: '#1a1f2e',
    },
  },
  typography,
  components: sharedComponents,
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
      default: 'transparent',
      paper: '#111520',
    },
  },
  typography,
  components: sharedComponents,
});
