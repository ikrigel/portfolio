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
          transition: 'elevation 0.3s ease',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
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
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              ikrigel
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Navigation />

              <ThemeSwitcher />

              <IconButton
                onClick={handleMenuOpen}
                sx={{ display: { xs: 'flex', md: 'none' } }}
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
