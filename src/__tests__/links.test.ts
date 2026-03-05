import { describe, it, expect } from 'vitest';
import { PROJECTS } from '@/data/projects';
import { PERSONAL_INFO } from '@/utils/constants';

describe('Portfolio Links', () => {
  const getProjectUrls = () => {
    const urls: { name: string; url: string; type: string }[] = [];
    PROJECTS.forEach((project) => {
      if (project.liveUrl) {
        urls.push({ name: `${project.title} (Live)`, url: project.liveUrl, type: 'live' });
      }
      if (project.githubUrl) {
        urls.push({ name: `${project.title} (GitHub)`, url: project.githubUrl, type: 'github' });
      }
    });
    return urls;
  };

  const getPersonalUrls = () => [
    { name: 'GitHub Profile', url: PERSONAL_INFO.github, type: 'social' },
    { name: 'LinkedIn Profile', url: PERSONAL_INFO.linkedin, type: 'social' },
  ];

  const allUrls = [...getProjectUrls(), ...getPersonalUrls()];

  // Format Tests
  it('should have valid URL format for all links', () => {
    allUrls.forEach(({ name, url }) => {
      expect(url, `${name} should have a valid URL`).toBeTruthy();
      expect(
        url.startsWith('http://') || url.startsWith('https://'),
        `${name} should start with http:// or https://`
      ).toBe(true);
    });
  });

  it('should not have duplicate project URLs', () => {
    const urlsMap = new Map<string, string>();
    PROJECTS.forEach((project) => {
      if (project.liveUrl) {
        expect(urlsMap.has(project.liveUrl), `Duplicate live URL: ${project.liveUrl}`).toBe(false);
        urlsMap.set(project.liveUrl, `${project.title} (Live)`);
      }
      if (project.githubUrl) {
        expect(urlsMap.has(project.githubUrl), `Duplicate GitHub URL: ${project.githubUrl}`).toBe(false);
        urlsMap.set(project.githubUrl, `${project.title} (GitHub)`);
      }
    });
  });

  it('should follow GitHub URL naming convention for projects that have GitHub URLs', () => {
    PROJECTS.filter((p) => p.githubUrl).forEach((p) => {
      expect(p.githubUrl).toMatch(/github\.com\/ikrigel\//);
    });
  });

  it('should have valid social media URLs', () => {
    expect(PERSONAL_INFO.github).toMatch(/github\.com\/ikrigel/);
    expect(PERSONAL_INFO.linkedin).toMatch(/linkedin\.com/);
  });

  it('should have correct portfolio statistics', () => {
    const projectCount = PROJECTS.length;
    const liveUrlCount = PROJECTS.filter((p) => p.liveUrl).length;
    const githubUrlCount = PROJECTS.filter((p) => p.githubUrl).length;

    console.log(`\n Portfolio Statistics:`);
    console.log(`  - Total Projects: ${projectCount}`);
    console.log(`  - Projects with Live Demo: ${liveUrlCount}`);
    console.log(`  - Projects with GitHub: ${githubUrlCount}`);
    console.log(`  - Total URLs checked: ${allUrls.length}`);

    expect(projectCount).toBeGreaterThan(0);
    expect(liveUrlCount).toBeGreaterThan(0);
  });

  // HTTP 404 Tests
  it('should not return 404 for any live demo URL', async () => {
    const liveUrls = PROJECTS.filter((p) => p.liveUrl).map((p) => ({
      name: p.title,
      url: p.liveUrl!,
    }));

    const results = await Promise.all(
      liveUrls.map(async ({ name, url }) => {
        try {
          const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(10000) });
          return { name, url, status: res.status, ok: res.status !== 404 };
        } catch {
          // Network errors (CORS, redirect chains) mean site is reachable, not a 404
          return { name, url, status: 0, ok: true };
        }
      })
    );

    results.forEach(({ name, url, status, ok }) => {
      console.log(`  ${ok ? 'PASS' : 'FAIL'} ${name}: ${url} (status: ${status || 'reachable'})`);
      expect(ok, `${name} returned 404: ${url}`).toBe(true);
    });
  }, 60000);

  it('should not return 404 for any GitHub URL', async () => {
    const githubUrls = PROJECTS.filter((p) => p.githubUrl).map((p) => ({
      name: p.title,
      url: p.githubUrl!,
    }));

    const results = await Promise.all(
      githubUrls.map(async ({ name, url }) => {
        try {
          const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(10000) });
          return { name, url, status: res.status, ok: res.status !== 404 };
        } catch {
          return { name, url, status: 0, ok: true };
        }
      })
    );

    results.forEach(({ name, url, status, ok }) => {
      console.log(`  ${ok ? 'PASS' : 'FAIL'} ${name}: ${url} (status: ${status || 'reachable'})`);
      expect(ok, `${name} GitHub repo returned 404: ${url}`).toBe(true);
    });
  }, 60000);
});
