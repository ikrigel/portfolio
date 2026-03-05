import { Box, Container, Typography, Stack, Chip } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import WorkIcon from '@mui/icons-material/Work';
import { EXPERIENCE } from '@/data/experience';

export function Experience() {
  return (
    <Box
      id="experience"
      component="section"
      sx={{
        py: { xs: 4, md: 8 },
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
          Experience & Background
        </Typography>

        <Timeline position="alternate-reverse" sx={{ mt: 4 }}>
          {EXPERIENCE.map((exp, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    bgcolor: 'primary.main',
                    boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.2)',
                  }}
                >
                  <WorkIcon />
                </TimelineDot>
                {index < EXPERIENCE.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent sx={{ py: { xs: 2, md: 4 } }}>
                <Box
                  sx={{
                    backgroundColor: 'action.hover',
                    p: 2.5,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 2,
                      transform: 'translateY(-2px)',
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
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    ))}
                  </Stack>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
}
