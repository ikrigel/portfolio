import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '@/utils/constants';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
  const activeId = useScrollSpy(sectionIds);

  // Detect hash changes and auto-scroll to the target section
  useEffect(() => {
    const currentHash = window.location.hash.slice(1);
    if (currentHash && sectionIds.includes(currentHash)) {
      // Small delay to ensure the page is fully rendered before scrolling
      const timer = setTimeout(() => {
        const element = document.getElementById(currentHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [sectionIds, location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, sectionId: string) => {
    e.preventDefault();
    const isOnMainPage = location.pathname === '/' || location.pathname === '';

    const navigateTo = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', `#${sectionId}`);
      }
    };

    if (!isOnMainPage) {
      // If on logs or settings, store target section and navigate to main page
      sessionStorage.setItem('targetSection', sectionId);
      navigate('/');
    } else {
      // Already on main page, just scroll
      navigateTo();
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        display: { xs: 'none', md: 'flex' },
        gap: 1,
        alignItems: 'center',
      }}
    >
      {NAV_ITEMS.map((item) => {
        const itemId = item.href.slice(1);
        const isActive = activeId === itemId;

        return (
          <Button
            key={item.href}
            onClick={(e) => handleNavClick(e, itemId)}
            sx={{
              color: isActive ? 'primary.main' : 'rgba(255, 255, 255, 0.85)',
              fontWeight: isActive ? 600 : 400,
              fontSize: '0.95rem',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s ease',
              '&:hover': {
                fontWeight: 600,
                color: 'primary.main',
              },
              ...(isActive && {
                color: 'primary.main',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '20%',
                  right: '20%',
                  height: '2px',
                  borderRadius: '1px',
                  bgcolor: 'primary.main',
                  boxShadow: '0 0 8px currentColor',
                },
              }),
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );
}
