import { useState, useMemo } from 'react';
import { Box, Container, Typography, Grid, Chip, Stack } from '@mui/material';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { useLogger } from '@/hooks/useLogger';

type Category = 'all' | 'web' | 'automation' | 'ai' | 'tool';

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const { log } = useLogger();

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
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
          }}
        >
          Featured Projects
        </Typography>

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
              color={selectedCategory === cat ? 'primary' : 'default'}
              variant={selectedCategory === cat ? 'filled' : 'outlined'}
              size="medium"
            />
          ))}
        </Stack>

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
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>

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
