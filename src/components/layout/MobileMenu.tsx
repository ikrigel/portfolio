import { Drawer, Box, Button, Divider, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '@/utils/constants';
import { ThemeSwitcher } from '@/components/features/ThemeSwitcher';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, sectionId: string) => {
    e.preventDefault();
    const isOnMainPage = location.pathname === '/' || location.pathname === '';

    const navigateTo = () => {
      onClose();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', `#${sectionId}`);
      }
    };

    if (!isOnMainPage) {
      // If on logs or settings, store target section and navigate to main page
      onClose();
      sessionStorage.setItem('targetSection', sectionId);
      navigate('/');
    } else {
      // Already on main page, just scroll
      navigateTo();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 700 }}>
          Menu
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.slice(1);
            return (
              <Button
                key={item.href}
                variant="text"
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  color: 'text.primary',
                  fontSize: '0.95rem',
                }}
                onClick={(e) => handleNavClick(e, sectionId)}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Theme
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <ThemeSwitcher />
          </Box>

          <Button
            href="/#/logs"
            variant="outlined"
            fullWidth
            size="small"
            onClick={onClose}
          >
            Logs
          </Button>
          <Button
            href="/#/settings"
            variant="outlined"
            fullWidth
            size="small"
            onClick={onClose}
          >
            Settings
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
