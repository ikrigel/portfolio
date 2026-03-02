import { Box, Container, Typography, Button, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { PERSONAL_INFO } from '@/utils/constants';

export function Hero() {
  return (
    <Box
      id="hero"
      component="section"
      sx={{
        minHeight: { xs: '85vh', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, transparent 0%, rgba(25, 118, 210, 0.05) 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: { xs: 120, md: 150 },
              height: { xs: 120, md: 150 },
              borderRadius: '50%',
              background: 'linear-gradient(135deg, primary.main, secondary.main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3.5rem',
              fontWeight: 700,
            }}
          >
            {PERSONAL_INFO.name.charAt(0).toUpperCase()}
          </Box>

          <Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 1,
              }}
            >
              {PERSONAL_INFO.name}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                fontSize: { xs: '1rem', md: '1.3rem' },
                mb: 3,
              }}
            >
              Full-Stack Developer & AI Integration Specialist
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              Building intelligent, scalable applications with React, TypeScript, and AI APIs.
              50+ projects delivered. Passionate about clean code and modern development practices.
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<GitHubIcon />}
              size="large"
            >
              GitHub
            </Button>

            <Button
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<LinkedInIcon />}
              size="large"
            >
              LinkedIn
            </Button>
          </Stack>

          <Box
            sx={{
              mt: 4,
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-10px)' },
              },
            }}
          >
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 32,
                color: 'primary.main',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
