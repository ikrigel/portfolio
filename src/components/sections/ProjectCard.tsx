import { Card, CardContent, CardActions, Typography, Chip, Stack, Button, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 4,
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
            }}
          >
            {project.title}
          </Typography>

          {project.featured && (
            <Chip
              label="Featured"
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mt: 0.5 }}
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
              variant="filled"
              sx={{
                fontSize: '0.75rem',
                height: 24,
              }}
            />
          ))}
        </Stack>
      </CardContent>

      <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
        <Button
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          startIcon={<GitHubIcon />}
          variant="outlined"
        >
          Code
        </Button>

        {project.liveUrl && (
          <Button
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            startIcon={<OpenInNewIcon />}
            variant="contained"
          >
            Live Demo
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
