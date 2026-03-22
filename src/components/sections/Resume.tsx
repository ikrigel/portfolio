import { Box, Container, Typography, Button, Stack, Paper, Grid } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { SKILL_CATEGORIES } from '@/data/skills';
import { useScrollAnimation, getAnimationSx } from '@/hooks/useScrollAnimation';
import { getGlassSx } from '@/utils/theme';
import type { Skill } from '@/types';

const LEVEL_PERCENT: Record<Skill['level'], number> = {
  beginner: 30,
  intermediate: 55,
  advanced: 78,
  expert: 95,
};

interface SkillBarProps {
  skill: Skill;
  isVisible: boolean;
  delay: number;
}

function SkillBar({ skill, isVisible, delay }: SkillBarProps) {
  const percent = LEVEL_PERCENT[skill.level];

  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
        {skill.name}
      </Typography>
      <Box
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
          mt: 0.5,
        }}
      >
        <Box
          sx={{
            height: '100%',
            borderRadius: 3,
            width: isVisible ? `${percent}%` : '0%',
            transition: `width 1.0s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
            background: (theme) =>
              `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: (theme) => `0 0 8px ${theme.palette.primary.main}66`,
          }}
        />
      </Box>
    </Box>
  );
}

export function Resume() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <Box
      id="resume"
      component="section"
      ref={sectionRef}
      sx={{
        py: { xs: 4, md: 8 },
        ...getAnimationSx(isVisible),
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
            sx={(theme) => ({
              fontWeight: 700,
              display: 'inline-block',
              position: 'relative',
              pb: 2,
              background: `linear-gradient(135deg, #ffffff 30%, ${theme.palette.primary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            })}
          >
            Resume & CV
          </Typography>

          <Button
            startIcon={<GetAppIcon />}
            size="large"
            href="/Yigal-Krigel-CV.docx"
            download="Yigal-Krigel-CV.docx"
            sx={(theme) => ({
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: '#fff',
              fontWeight: 700,
              '&:hover': {
                boxShadow: `0 0 20px ${theme.palette.primary.main}66`,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            })}
          >
            Download CV
          </Button>
        </Stack>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                ...getGlassSx(0.06),
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  borderLeft: '3px solid',
                  borderColor: 'primary.main',
                  pl: 1.5,
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
            <Paper
              sx={{
                p: 3,
                ...getGlassSx(0.06),
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2.5,
                  borderLeft: '3px solid',
                  borderColor: 'primary.main',
                  pl: 1.5,
                }}
              >
                Key Skills
              </Typography>

              <Grid container spacing={3}>
                {SKILL_CATEGORIES.slice(0, 4).map((category, catIdx) => (
                  <Grid item xs={12} sm={6} key={category.name}>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          mb: 1.5,
                          color: 'primary.main',
                        }}
                      >
                        {category.name}
                      </Typography>

                      <Stack spacing={0.2}>
                        {category.skills.slice(0, 4).map((skill, skillIdx) => (
                          <SkillBar
                            key={skill.name}
                            skill={skill}
                            isVisible={isVisible}
                            delay={catIdx * 150 + skillIdx * 80}
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
            <Paper
              sx={{
                p: 3,
                ...getGlassSx(0.06),
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  borderLeft: '3px solid',
                  borderColor: 'primary.main',
                  pl: 1.5,
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
