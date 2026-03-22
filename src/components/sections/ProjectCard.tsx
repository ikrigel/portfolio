import { Card, CardContent, CardActions, Typography, Chip, Stack, Button, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { Project } from '@/types';
import { getGlassSx } from '@/utils/theme';

interface ProjectCardProps {
  project: Project;
}

const CATEGORY_COLORS: Record<string, string> = {
  web: '#42a5f5',
  ai: '#ab47bc',
  automation: '#00bcd4',
  tool: '#66bb6a',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const accentColor = CATEGORY_COLORS[project.category] ?? '#00bcd4';

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        ...getGlassSx(0.06),
        '&::before': {
          content: '""',
          display: 'block',
          height: '3px',
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
          borderRadius: '12px 12px 0 0',
        },
        '&:hover': {
          boxShadow: `0 16px 48px rgba(0,0,0,0.6), 0 0 20px ${accentColor}33`,
          transform: 'translateY(-8px)',
        },
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              color: '#ffffff',
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            }}
          >
            {project.title}
          </Typography>

          {project.featured && (
            <Chip
              label="Featured"
              size="small"
              sx={(theme) => ({
                mt: 0.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
                fontWeight: 600,
              })}
            />
          )}
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          {project.description}
        </Typography>

        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
          {project.technologies.map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              size="small"
              sx={(theme) => ({
                fontSize: '0.75rem',
                height: 24,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}88, ${theme.palette.secondary.main}88)`,
                color: '#fff',
                border: 'none',
              })}
            />
          ))}
        </Stack>
      </CardContent>

      <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
        {project.githubUrl && (
          <Button
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            startIcon={<GitHubIcon />}
            variant="outlined"
            sx={{
              borderColor: 'rgba(255,255,255,0.20)',
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.main',
              },
            }}
          >
            Code
          </Button>
        )}

        {project.liveUrl && (
          <Button
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            startIcon={<OpenInNewIcon />}
            variant="contained"
            sx={(theme) => ({
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              border: 'none',
              '&:hover': {
                boxShadow: `0 0 12px ${theme.palette.primary.main}66`,
              },
            })}
          >
            Live Demo
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
