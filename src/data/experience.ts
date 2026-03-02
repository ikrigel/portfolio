import type { ExperienceEntry } from '@/types';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Independent Developer / Freelance',
    role: 'Full-Stack Developer & AI Integration Specialist',
    period: '2021 - Present',
    description: [
      'Developed 50+ production applications and tools using React, Node.js, and TypeScript',
      'Integrated AI/ML models including Claude API, Gemini, and OpenAI into applications',
      'Built automation workflows using N8N and GitHub Actions for enterprise clients',
      'Implemented real-time features using WebSockets and modern React patterns',
      'Deployed applications on Vercel, Render, and GCP with CI/CD pipelines',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Claude API',
      'Gemini API',
      'N8N',
      'PostgreSQL',
      'Vercel',
    ],
  },
  {
    company: 'Open Source Contributions',
    role: 'Open Source Developer',
    period: '2020 - Present',
    description: [
      'Contributed to multiple open-source projects with focus on developer tools and utilities',
      'Maintained repositories with comprehensive documentation and CI/CD pipelines',
      'Collaborated with community members on bug fixes and feature implementations',
      'Created educational content and tutorials for developers',
    ],
    technologies: ['JavaScript', 'TypeScript', 'Python', 'Git', 'GitHub'],
  },
];
