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
  // Determine if we should use light or dark mode based on brightness
  const isLight = brightness > 0.5;

  // Accent colors: cyan (dark) → blue (light)
  const primary   = interpolateColor('#00bcd4', '#42a5f5', brightness);
  const secondary = interpolateColor('#ab47bc', '#ce93d8', brightness);

  // Card / paper background: very dark navy → white
  const paperBg = isLight
    ? interpolateColor('#252d45', '#ffffff', (brightness - 0.5) * 2)
    : interpolateColor('#0c0f1a', '#252d45', brightness * 2);

  // Text colors based on mode
  const textPrimary = isLight ? '#1a1a1a' : '#ffffff';
  const textSecondary = isLight ? '#666666' : 'rgba(255, 255, 255, 0.7)';

  return createTheme({
    palette: {
      mode: isLight ? 'light' : 'dark',
      primary:   { main: primary },
      secondary: { main: secondary },
      background: {
        default: 'transparent',
        paper: paperBg,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
      },
    },
    typography: {
      ...typography,
      ...(isLight && {
        h1: { ...typography.h1, color: textPrimary },
        h2: { ...typography.h2, color: textPrimary },
        h3: { ...typography.h3, color: textPrimary },
        h4: { ...typography.h4, color: textPrimary },
        h5: { ...typography.h5, color: textPrimary },
        h6: { ...typography.h6, color: textPrimary },
        body1: { color: textSecondary },
        body2: { color: textSecondary },
      }),
    },
    components: sharedComponents,
  });
}

// Convenience aliases used in App.tsx for manual light / dark selection
export const lightTheme = createAutoTheme(0.90);
export const darkTheme  = createAutoTheme(0.05);

/**
 * Glassmorphism effect helper — returns sx props for glass background.
 * Works best with a background image behind (like the parallax).
 */
export function getGlassSx(opacity = 0.06): Record<string, unknown> {
  return {
    backgroundColor: `rgba(12, 15, 26, ${opacity})`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)', // Safari support
    border: '1px solid rgba(255, 255, 255, 0.10)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  };
}

/**
 * Section heading accent with animated gradient underline.
 * Pass theme.palette.primary.main as the primary color.
 */
export function getGradientAccentHeadingSx(primaryColor: string): Record<string, unknown> {
  return {
    display: 'inline-block',
    position: 'relative',
    pb: 2,
    mb: 2,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '3px',
      borderRadius: '2px',
      background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
      boxShadow: `0 0 10px ${primaryColor}`,
    },
  };
}
