import type { SkillCategory } from '@/types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Languages',
    skills: [
      { name: 'TypeScript', level: 'expert' },
      { name: 'JavaScript', level: 'expert' },
      { name: 'Python', level: 'advanced' },
      { name: 'HTML/CSS', level: 'expert' },
      { name: 'SQL', level: 'advanced' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React 18+', level: 'expert' },
      { name: 'Material-UI', level: 'advanced' },
      { name: 'Tailwind CSS', level: 'advanced' },
      { name: 'Vite', level: 'advanced' },
      { name: 'Next.js', level: 'intermediate' },
      { name: 'Angular', level: 'intermediate' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 'advanced' },
      { name: 'Express.js', level: 'advanced' },
      { name: 'Python/Flask', level: 'intermediate' },
      { name: 'FastAPI', level: 'intermediate' },
      { name: 'REST APIs', level: 'expert' },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 'advanced' },
      { name: 'MongoDB', level: 'intermediate' },
      { name: 'Supabase', level: 'advanced' },
      { name: 'Elasticsearch', level: 'intermediate' },
      { name: 'Redis', level: 'intermediate' },
    ],
  },
  {
    name: 'AI/ML',
    skills: [
      { name: 'Claude API', level: 'expert' },
      { name: 'Gemini API', level: 'advanced' },
      { name: 'OpenAI API', level: 'advanced' },
      { name: 'Prompt Engineering', level: 'expert' },
      { name: 'RAG Systems', level: 'advanced' },
      { name: 'Agent Development', level: 'advanced' },
    ],
  },
  {
    name: 'Automation',
    skills: [
      { name: 'N8N', level: 'advanced' },
      { name: 'Playwright', level: 'advanced' },
      { name: 'GitHub Actions', level: 'advanced' },
      { name: 'CI/CD Pipelines', level: 'advanced' },
      { name: 'Webhooks', level: 'intermediate' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'Vercel', level: 'expert' },
      { name: 'GCP', level: 'intermediate' },
      { name: 'Render', level: 'intermediate' },
      { name: 'Docker', level: 'intermediate' },
      { name: 'AWS Basics', level: 'beginner' },
    ],
  },
  {
    name: 'Testing',
    skills: [
      { name: 'Playwright E2E', level: 'advanced' },
      { name: 'Vitest', level: 'intermediate' },
      { name: 'React Testing Library', level: 'intermediate' },
      { name: 'Unit Testing', level: 'advanced' },
    ],
  },
];
