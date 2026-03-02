import { Box, Button } from '@mui/material';
import { NAV_ITEMS } from '@/utils/constants';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export function Navigation() {
  const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
  const activeId = useScrollSpy(sectionIds);

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
            href={item.href}
            color={isActive ? 'primary' : 'inherit'}
            sx={{
              fontWeight: isActive ? 600 : 400,
              borderBottom: isActive ? '2px solid' : 'none',
              borderColor: 'primary.main',
              fontSize: '0.95rem',
              '&:hover': {
                fontWeight: 600,
              },
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );
}
