import { Box, Container, Typography, Button, Stack, Paper, Grid, Chip } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { SKILL_CATEGORIES } from '@/data/skills';

export function Resume() {
  return (
    <Box
      id="resume"
      component="section"
      sx={{
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
            }}
          >
            Resume & CV
          </Typography>

          <Button
            startIcon={<GetAppIcon />}
            variant="contained"
            size="large"
            href="/Yigal-Krigel-CV.docx"
            download="Yigal-Krigel-CV.docx"
          >
            Download CV
          </Button>
        </Stack>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Professional Summary
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  fontSize: '1rem',
                }}
              >
                Full-Stack Developer with 4+ years of experience building modern web applications
                and AI-powered solutions. Expertise in React, TypeScript, Node.js, and AI integration
                (Claude API, Gemini, OpenAI). Proven track record of delivering 50+ projects across
                various domains including web applications, automation systems, and intelligent tools.
                Passionate about clean code, best practices, and continuous learning.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Key Skills
              </Typography>

              <Grid container spacing={2}>
                {SKILL_CATEGORIES.slice(0, 4).map((category) => (
                  <Grid item xs={12} sm={6} key={category.name}>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {category.name}
                      </Typography>

                      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                        {category.skills.slice(0, 4).map((skill) => (
                          <Chip
                            key={skill.name}
                            label={skill.name}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Key Achievements
              </Typography>

              <Stack spacing={1.5}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Built and deployed 50+ production applications with React and TypeScript
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Integrated advanced AI models (Claude, Gemini, OpenAI) into 15+ applications
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Designed and implemented automated workflows using N8N and CI/CD pipelines
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Created scalable full-stack systems handling high-traffic scenarios
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Mentored junior developers and contributed to open-source projects
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
