import { Box, Container, Typography, Button, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { PERSONAL_INFO } from '@/utils/constants';
import { getGlassSx } from '@/utils/theme';

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
            animation: 'heroEntrance 0.9s ease forwards',
            '@keyframes heroEntrance': {
              '0%': { opacity: 0, transform: 'translateY(40px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {/* Animated avatar with pulsing glow */}
          <Box
            component="img"
            src="/pictures/Igal-Krigel.jpeg"
            alt={PERSONAL_INFO.name}
            sx={{
              width: { xs: 130, md: 160 },
              height: { xs: 130, md: 160 },
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid transparent',
              backgroundImage: (theme) =>
                `linear-gradient(background.paper, background.paper), linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundOrigin: 'border-box',
              backgroundClip: 'content-box, border-box',
              boxShadow: (theme) =>
                `0 0 0 4px ${theme.palette.primary.main}22, 0 0 40px ${theme.palette.primary.main}44`,
              animation: 'avatarPulse 3s ease-in-out infinite',
              '@keyframes avatarPulse': {
                '0%, 100%': {
                  boxShadow:
                    '0 0 0 4px rgba(0,188,212,0.13), 0 0 40px rgba(0,188,212,0.26)',
                },
                '50%': {
                  boxShadow:
                    '0 0 0 8px rgba(0,188,212,0.08), 0 0 60px rgba(0,188,212,0.4)',
                },
              },
            }}
          />

          <Box>
            {/* Animated gradient name */}
            <Typography
              variant="h3"
              component="h1"
              sx={(theme) => ({
                fontWeight: 800,
                fontSize: { xs: '2.2rem', md: '3.5rem' },
                mb: 1,
                background: `linear-gradient(135deg, #ffffff 0%, ${theme.palette.primary.main} 50%, #ffffff 100%)`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'heroNameShimmer 5s linear infinite',
                '@keyframes heroNameShimmer': {
                  '0%': { backgroundPosition: '0% center' },
                  '100%': { backgroundPosition: '200% center' },
                },
              })}
            >
              {PERSONAL_INFO.name}
            </Typography>

            {/* Title with typing cursor effect */}
            <Typography
              variant="h5"
              sx={(theme) => ({
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: { xs: '1rem', md: '1.3rem' },
                mb: 3,
                '&::after': {
                  content: '"  |"',
                  animation: 'typingCursor 1s step-end infinite',
                  color: theme.palette.primary.main,
                },
                '@keyframes typingCursor': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0 },
                },
              })}
            >
              Full-Stack Developer & AI Integration Specialist
            </Typography>

            {/* Bio text in glass card */}
            <Box
              sx={{
                ...getGlassSx(0.05),
                borderRadius: 2,
                p: { xs: 2.5, md: 3.5 },
                maxWidth: 580,
                mx: 'auto',
                mb: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  lineHeight: 1.7,
                }}
              >
                Building intelligent, scalable applications with React, TypeScript, and AI APIs.
                50+ projects delivered. Passionate about clean code and modern development
                practices.
              </Typography>
            </Box>
          </Box>

          {/* CTA Buttons */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Button
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              sx={(theme) => ({
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
                fontWeight: 700,
                px: 3,
                border: 'none',
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  boxShadow: `0 0 24px ${theme.palette.primary.main}66`,
                  transform: 'translateY(-3px)',
                },
                transition: 'all 0.3s ease',
              })}
              startIcon={<GitHubIcon />}
            >
              GitHub
            </Button>

            <Button
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              sx={(theme) => ({
                border: `1.5px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                fontWeight: 700,
                px: 3,
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}22`,
                  boxShadow: `0 0 20px ${theme.palette.primary.main}44`,
                  transform: 'translateY(-3px)',
                },
                transition: 'all 0.3s ease',
              })}
              startIcon={<LinkedInIcon />}
            >
              LinkedIn
            </Button>
          </Stack>

          {/* Enhanced scroll indicator */}
          <Box
            sx={{
              mt: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              opacity: 0.6,
              animation: 'scrollHint 2.5s ease-in-out infinite',
              '@keyframes scrollHint': {
                '0%, 100%': { transform: 'translateY(0)', opacity: 0.6 },
                '50%': { transform: 'translateY(10px)', opacity: 1 },
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                letterSpacing: 3,
                fontSize: '0.7rem',
                color: 'primary.main',
                fontWeight: 600,
              }}
            >
              SCROLL
            </Typography>
            <KeyboardArrowDownIcon sx={{ fontSize: 24, color: 'primary.main' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
