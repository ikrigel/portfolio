import { Box, Container, Typography, Stack, Chip } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import WorkIcon from '@mui/icons-material/Work';
import { EXPERIENCE } from '@/data/experience';
import { useScrollAnimation, getAnimationSx } from '@/hooks/useScrollAnimation';
import { getGlassSx } from '@/utils/theme';

export function Experience() {
  const [timelineRef, isVisible] = useScrollAnimation();

  return (
    <Box
      id="experience"
      component="section"
      sx={{
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
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
            Experience & Background
          </Typography>
        </Box>

        <Box ref={timelineRef}>
          <Timeline
            position="alternate-reverse"
            sx={{ mt: 4 }}
          >
            {EXPERIENCE.map((exp, index) => (
            <TimelineItem
              key={index}
              sx={{
                ...getAnimationSx(isVisible, index * 120),
              }}
            >
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    bgcolor: 'primary.main',
                    animation: 'pulse 2.5s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': {
                        boxShadow:
                          '0 0 0 4px rgba(0,188,212,0.13), 0 0 0px rgba(0,188,212,0.26)',
                      },
                      '50%': {
                        boxShadow:
                          '0 0 0 8px rgba(0,188,212,0.08), 0 0 16px rgba(0,188,212,0.55)',
                      },
                    },
                  }}
                >
                  <WorkIcon />
                </TimelineDot>
                {index < EXPERIENCE.length - 1 && (
                  <TimelineConnector
                    sx={{
                      background: 'linear-gradient(180deg, primary.main 0%, transparent 100%)',
                      opacity: 0.4,
                    }}
                  />
                )}
              </TimelineSeparator>

              <TimelineContent sx={{ py: { xs: 2, md: 4 } }}>
                <Box
                  sx={{
                    ...getGlassSx(0.07),
                    p: 2.5,
                    borderLeft: '3px solid',
                    borderColor: 'primary.main',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: (theme) =>
                        `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${theme.palette.primary.main}33`,
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    {exp.role}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {exp.company}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      display: 'block',
                      mb: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    {exp.period}
                  </Typography>

                  <Stack spacing={1} sx={{ mb: 1.5 }}>
                    {exp.description.map((desc, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                        }}
                      >
                        • {desc}
                      </Typography>
                    ))}
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                    {exp.technologies.map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech}
                        size="small"
                        sx={(theme) => ({
                          fontSize: '0.75rem',
                          border: '1px solid',
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          backgroundColor: 'transparent',
                          '&:hover': {
                            backgroundColor: `${theme.palette.primary.main}22`,
                            color: theme.palette.primary.main,
                            boxShadow: `0 0 8px ${theme.palette.primary.main}66`,
                          },
                          transition: 'all 0.2s ease',
                        })}
                      />
                    ))}
                  </Stack>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
          </Timeline>
        </Box>
      </Container>
    </Box>
  );
}
