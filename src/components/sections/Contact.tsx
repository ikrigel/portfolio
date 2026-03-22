import { Box, Container, Typography, Paper, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { ContactForm } from '@/components/features/ContactForm';
import { PERSONAL_INFO } from '@/utils/constants';
import { useScrollAnimation, getAnimationSx } from '@/hooks/useScrollAnimation';
import { getGlassSx } from '@/utils/theme';

export function Contact() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <Box
      id="contact"
      component="section"
      ref={sectionRef}
      sx={{
        py: { xs: 4, md: 8 },
        ...getAnimationSx(isVisible),
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={(theme) => ({
              fontWeight: 700,
              display: 'inline-block',
              position: 'relative',
              pb: 2,
              mb: 2,
              background: `linear-gradient(135deg, #ffffff 30%, ${theme.palette.primary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '3px',
                borderRadius: '2px',
                background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                boxShadow: `0 0 10px ${theme.palette.primary.main}`,
              },
            })}
          >
            Get In Touch
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 4,
            fontSize: '1.05rem',
          }}
        >
          Have a question or want to work together? Feel free to reach out!
        </Typography>

        <Stack spacing={3}>
          <Paper
            sx={{
              p: 3,
              ...getGlassSx(0.07),
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <EmailIcon
              sx={{
                color: 'primary.main',
                fontSize: 32,
                flexShrink: 0,
              }}
            />
            <Stack spacing={0.5}>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                Email
              </Typography>
              <Typography
                component="a"
                href={`mailto:${PERSONAL_INFO.email}`}
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'primary.main',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    textShadow: '0 0 8px currentColor',
                  },
                }}
              >
                {PERSONAL_INFO.email}
              </Typography>
            </Stack>
          </Paper>

          <Paper
            sx={{
              p: 4,
              ...getGlassSx(0.05),
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '2px',
                background: (theme) =>
                  `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                borderRadius: '1px',
              },
            }}
          >
            <ContactForm />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
