import { Box, Container, Typography, IconButton, Link, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { PERSONAL_INFO } from '@/utils/constants';
import { getGlassSx } from '@/utils/theme';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        ...getGlassSx(0.04),
        padding: '3rem 0 2rem',
        marginTop: '4rem',
        position: 'relative',
        borderTop: 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '5%',
          right: '5%',
          height: '1px',
          background: (theme) =>
            `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
          borderRadius: '1px',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Built with React, TypeScript & MUI
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              title="GitHub"
              sx={{
                color: 'text.primary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'translateY(-2px)',
                  filter: 'drop-shadow(0 0 6px currentColor)',
                },
              }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              title="LinkedIn"
              sx={{
                color: 'text.primary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'translateY(-2px)',
                  filter: 'drop-shadow(0 0 6px currentColor)',
                },
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href={`mailto:${PERSONAL_INFO.email}`}
              size="small"
              title="Email"
              sx={{
                color: 'text.primary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'translateY(-2px)',
                  filter: 'drop-shadow(0 0 6px currentColor)',
                },
              }}
            >
              <EmailIcon />
            </IconButton>
          </Stack>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link
              href="/#/logs"
              underline="hover"
              variant="caption"
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: 'primary.main',
                  textShadow: '0 0 4px currentColor',
                },
              }}
            >
              Logs
            </Link>
            <Link
              href="/#/settings"
              underline="hover"
              variant="caption"
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: 'primary.main',
                  textShadow: '0 0 4px currentColor',
                },
              }}
            >
              Settings
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
