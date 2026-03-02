import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const STATS = [
  { label: 'Projects Completed', value: '50+' },
  { label: 'GitHub Repositories', value: '52+' },
  { label: 'Years Experience', value: '4+' },
  { label: 'Technologies', value: '25+' },
];

export function About() {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 4, md: 8 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
          }}
        >
          About Me
        </Typography>

        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'text.secondary',
                }}
              >
                I'm a full-stack developer and AI integration specialist based in Petah Tiqva, EMEA.
                With over 4 years of experience, I've built 50+ projects ranging from web applications
                to automation systems and AI-powered tools.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'text.secondary',
                }}
              >
                My expertise spans modern React applications, TypeScript, Node.js backend development,
                and cutting-edge AI/ML integrations. I specialize in building intelligent systems that
                solve real-world problems using APIs like Claude, Gemini, and OpenAI.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'text.secondary',
                }}
              >
                I'm passionate about writing clean, maintainable code and staying at the forefront
                of web development. Always learning, always building.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {STATS.map((stat, index) => (
                <Grid item xs={6} key={index}>
                  <Paper
                    sx={{
                      p: 2.5,
                      textAlign: 'center',
                      backgroundColor: 'action.hover',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 2,
                      },
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
