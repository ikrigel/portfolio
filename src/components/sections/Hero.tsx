import { Box, Container, Typography, Button, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { PERSONAL_INFO } from '@/utils/constants';
import { useParallax } from '@/hooks/useParallax';

export function Hero() {
  const parallaxOffset = useParallax();

  return (
    <Box
      id="hero"
      component="section"
      sx={{
        minHeight: { xs: '85vh', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: 4,
      }}
    >
      {/* Parallax Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/pictures/neural-network.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${parallaxOffset}px)`,
          transition: 'transform 0.1s ease-out',
          zIndex: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(10, 10, 10, 0.3) 0%, rgba(10, 10, 10, 0.6) 100%)',
            zIndex: 1,
          },
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
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
            component="img"
            src="/pictures/Igal-Krigel.jpeg"
            alt={PERSONAL_INFO.name}
            sx={{
              width: { xs: 120, md: 150 },
              height: { xs: 120, md: 150 },
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid',
              borderColor: 'primary.main',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            }}
          />

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
