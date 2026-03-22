import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import { ThemeSwitcher } from '@/components/features/ThemeSwitcher';
import { useLogger } from '@/hooks/useLogger';
import { PERSONAL_INFO } from '@/utils/constants';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { log } = useLogger();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpen = () => {
    setMobileMenuOpen(true);
    log('verbose', 'mobile_menu_open', '');
  };

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
    log('verbose', 'mobile_menu_close', '');
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={scrolled ? 4 : 0}
        sx={{
          transition: 'all 0.4s ease',
          backgroundColor: scrolled ? 'rgba(12, 15, 26, 0.88)' : 'rgba(12, 15, 26, 0.35)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(6px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(6px)',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'rgba(255, 255, 255, 0.10)' : 'transparent',
          boxShadow: scrolled ? '0 4px 32px rgba(0, 0, 0, 0.4)' : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              href="#hero"
              sx={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'primary.main',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textShadow: '0 0 16px currentColor',
                  transform: 'scale(1.02)',
                },
              }}
            >
              {PERSONAL_INFO.name}
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Navigation />

              <ThemeSwitcher />

              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileMenu open={mobileMenuOpen} onClose={handleMenuClose} />
    </>
  );
}
