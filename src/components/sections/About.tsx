import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { useScrollAnimation, getAnimationSx } from '@/hooks/useScrollAnimation';
import { getGlassSx } from '@/utils/theme';

const STATS = [
  { label: 'Projects Completed', numeric: 50, suffix: '+' },
  { label: 'GitHub Repositories', numeric: 52, suffix: '+' },
  { label: 'Years Experience', numeric: 4, suffix: '+' },
  { label: 'Technologies', numeric: 25, suffix: '+' },
];

interface AnimatedCounterProps {
  target: number;
  suffix: string;
  isVisible: boolean;
  delay: number;
}

function AnimatedCounter({ target, suffix, isVisible, delay }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId: number;
    const startTime = Date.now() + delay;
    const duration = 1200; // ms

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed < 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (elapsed >= duration) {
        setCount(target);
        return;
      }

      // Easing: easeOutQuart
      const progress = elapsed / duration;
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, target, delay]);

  return (
    <Typography
      variant="h4"
      sx={(theme) => ({
        fontWeight: 700,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        mb: 1,
      })}
    >
      {count}
      {suffix}
    </Typography>
  );
}

export function About() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <Box
      id="about"
      component="section"
      ref={sectionRef}
      sx={{
        py: { xs: 4, md: 8 },
        ...getAnimationSx(isVisible),
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
            About Me
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                I'm a full-stack developer and AI integration specialist based in Ramt Zvi, Israel, EMEA.
                With over 4 years of experience, I've built 50+ projects ranging from web applications
                to automation systems and AI-powered tools.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.75)',
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
                  color: 'rgba(255,255,255,0.75)',
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
                      ...getGlassSx(0.07),
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: (theme) =>
                          `0 12px 40px rgba(0,0,0,0.5), 0 0 24px ${theme.palette.primary.main}33`,
                      },
                    }}
                  >
                    <AnimatedCounter
                      target={stat.numeric}
                      suffix={stat.suffix}
                      isVisible={isVisible}
                      delay={index * 100}
                    />
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
