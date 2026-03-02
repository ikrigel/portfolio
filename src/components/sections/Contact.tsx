import { Box, Container, Typography, Paper, Stack } from '@mui/material';
import { ContactForm } from '@/components/features/ContactForm';
import { PERSONAL_INFO } from '@/utils/constants';

export function Contact() {
  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 4, md: 8 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 1,
            textAlign: 'center',
          }}
        >
          Get In Touch
        </Typography>

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
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography
                component="a"
                href={`mailto:${PERSONAL_INFO.email}`}
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {PERSONAL_INFO.email}
              </Typography>
            </Stack>
          </Paper>

          <Paper sx={{ p: 4 }}>
            <ContactForm />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
