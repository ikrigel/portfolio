import { useState, useMemo } from 'react';
import { Box, Container, Typography, Grid, Chip, Stack } from '@mui/material';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { useLogger } from '@/hooks/useLogger';
import { useScrollAnimation, getAnimationSx } from '@/hooks/useScrollAnimation';

type Category = 'all' | 'web' | 'automation' | 'ai' | 'tool';

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const { log } = useLogger();
  const [gridRef, isVisible] = useScrollAnimation();

  const categories: Category[] = ['all', 'web', 'automation', 'ai', 'tool'];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    log('verbose', 'projects_filter_changed', `Filtered by ${category}`);
  };

  const getCategoryLabel = (cat: Category) => {
    const labels: Record<Category, string> = {
      all: 'All Projects',
      web: 'Web Apps',
      automation: 'Automation',
      ai: 'AI & ML',
      tool: 'Tools',
    };
    return labels[cat];
  };

  return (
    <Box
      id="projects"
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
            Featured Projects
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: 'center',
            mb: 4,
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={getCategoryLabel(cat)}
              onClick={() => handleCategoryChange(cat)}
              sx={(theme) => ({
                fontSize: '0.9rem',
                ...(selectedCategory === cat
                  ? {
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: '#fff',
                      fontWeight: 600,
                      border: 'none',
                      '&:hover': { opacity: 0.9 },
                    }
                  : {
                      border: '1px solid rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(4px)',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                      },
                    }),
                transition: 'all 0.2s ease',
              })}
            />
          ))}
        </Stack>

        <Box ref={gridRef}>
          <Grid
            container
            spacing={3}
            sx={{
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
            }}
          >
            {filteredProjects.map((project, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={project.id}
                sx={{
                  ...getAnimationSx(isVisible, index * 70),
                }}
              >
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {filteredProjects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              No projects found in this category.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
