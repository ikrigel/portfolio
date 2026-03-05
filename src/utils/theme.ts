import { createTheme } from '@mui/material/styles';

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
  MuiCard: { styleOverrides: { root: { borderRadius: 12 } } },
  MuiPaper: { styleOverrides: { root: {} } },
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
 * Build a fully brightness-reactive theme (0 = midnight dark, 1 = midday lighter).
 * All colors — accent, card backgrounds, text — respond to brightness.
 *
 * Used by all three theme modes:
 *   auto  → real time-based brightness
 *   light → fixed brightness 0.90
 *   dark  → fixed brightness 0.05
 */
export function createAutoTheme(brightness: number): ReturnType<typeof createTheme> {
  // Accent colors: cyan (dark) → blue (light)
  const primary   = interpolateColor('#00bcd4', '#42a5f5', brightness);
  const secondary = interpolateColor('#ab47bc', '#ce93d8', brightness);

  // Card / paper background: very dark navy → slightly lighter navy
  const paperBg = interpolateColor('#0c0f1a', '#252d45', brightness);

  return createTheme({
    palette: {
      mode: 'dark',   // Always dark text-on-dark so cards stay readable
      primary:   { main: primary },
      secondary: { main: secondary },
      background: {
        default: 'transparent',
        paper: paperBg,
      },
    },
    typography,
    components: sharedComponents,
  });
}

// Convenience aliases used in App.tsx for manual light / dark selection
export const lightTheme = createAutoTheme(0.90);
export const darkTheme  = createAutoTheme(0.05);
