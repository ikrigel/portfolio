import { useRef, useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import PublishIcon from '@mui/icons-material/Publish';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useSettings } from '@/contexts/SettingsContext';
import { useLogger } from '@/hooks/useLogger';

export function SettingsPanel() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { log } = useLogger();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const handleThemeChange = (value: string) => {
    updateSettings({ theme: value as any });
    log('info', 'settings_theme_changed', `Changed to ${value}`);
  };

  const handleLogLevelChange = (value: string) => {
    updateSettings({ logLevel: value as any });
    log('info', 'settings_log_level_changed', `Changed to ${value}`);
  };

  const handleAnimationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    updateSettings({ animationsEnabled: value });
    log('verbose', 'settings_animations_toggled', `Animations ${value ? 'enabled' : 'disabled'}`);
  };

  const handleEmailNotificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    updateSettings({ emailNotifications: value });
    log('verbose', 'settings_notifications_toggled', `Notifications ${value ? 'enabled' : 'disabled'}`);
  };

  const handleExportSettings = () => {
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-settings-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    log('info', 'settings_exported', '');
  };

  const handleImportSettings = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        updateSettings(imported);
        log('info', 'settings_imported', '');
      } catch {
        log('error', 'settings_import_failed', 'Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleResetSettings = () => {
    resetSettings();
    setResetDialogOpen(false);
    log('info', 'settings_reset', '');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Settings
      </Typography>

      <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Appearance
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Theme</InputLabel>
            <Select
              value={settings.theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              label="Theme"
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
              <MenuItem value="auto">Auto (Time-based)</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={settings.animationsEnabled}
                onChange={handleAnimationsChange}
              />
            }
            label="Enable animations"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Logging
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Log Level</InputLabel>
            <Select
              value={settings.logLevel}
              onChange={(e) => handleLogLevelChange(e.target.value)}
              label="Log Level"
            >
              <MenuItem value="none">None (No logging)</MenuItem>
              <MenuItem value="error">Error only</MenuItem>
              <MenuItem value="info">Info & Errors</MenuItem>
              <MenuItem value="verbose">Verbose (All)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Notifications
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={settings.emailNotifications}
                onChange={handleEmailNotificationsChange}
              />
            }
            label="Email notifications"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Settings Management
          </Typography>

          <Alert severity="info" sx={{ mb: 2, fontSize: '0.9rem' }}>
            Export your settings to back them up or import settings from another device.
          </Alert>

          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Button
              startIcon={<GetAppIcon />}
              onClick={handleExportSettings}
              variant="outlined"
              size="small"
            >
              Export Settings
            </Button>

            <Button
              startIcon={<PublishIcon />}
              onClick={handleImportSettings}
              variant="outlined"
              size="small"
            >
              Import Settings
            </Button>

            <Button
              startIcon={<RestartAltIcon />}
              onClick={() => setResetDialogOpen(true)}
              variant="outlined"
              color="warning"
              size="small"
            >
              Reset to Defaults
            </Button>
          </Stack>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </Box>
      </Paper>

      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
        <DialogTitle>Reset settings to defaults?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            This action cannot be undone. All your settings will be reset to their default values.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleResetSettings}
            color="warning"
            variant="contained"
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
