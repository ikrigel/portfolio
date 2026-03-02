import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import type { ThemeMode } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { useLogger } from '@/hooks/useLogger';

const CYCLE: ThemeMode[] = ['light', 'dark', 'auto'];
const ICONS = {
  light: <LightModeIcon />,
  dark: <DarkModeIcon />,
  auto: <BrightnessAutoIcon />,
};
const LABELS = {
  light: 'Light Mode',
  dark: 'Dark Mode',
  auto: 'Auto Mode',
};

export function ThemeSwitcher() {
  const { themeMode, setThemeMode } = useTheme();
  const { log } = useLogger();

  const handleClick = () => {
    const currentIndex = CYCLE.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % CYCLE.length;
    const nextMode = CYCLE[nextIndex];
    setThemeMode(nextMode);
    log('verbose', 'theme_change', `Changed to ${nextMode} mode`);
  };

  const nextMode = CYCLE[(CYCLE.indexOf(themeMode) + 1) % CYCLE.length];

  return (
    <Tooltip title={`Switch to ${LABELS[nextMode]}`}>
      <IconButton onClick={handleClick} color="inherit" size="large">
        {ICONS[themeMode]}
      </IconButton>
    </Tooltip>
  );
}
