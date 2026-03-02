import { Box, Container, Typography, IconButton, Link, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { PERSONAL_INFO } from '@/utils/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        padding: '3rem 0 2rem',
        marginTop: '4rem',
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
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href={`mailto:${PERSONAL_INFO.email}`}
              size="small"
              title="Email"
            >
              <EmailIcon />
            </IconButton>
          </Stack>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/#/logs" underline="hover" variant="caption">
              Logs
            </Link>
            <Link href="/#/settings" underline="hover" variant="caption">
              Settings
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
