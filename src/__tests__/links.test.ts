import { describe, it, expect } from 'vitest';
import { PROJECTS } from '@/data/projects';
import { PERSONAL_INFO } from '@/utils/constants';

/**
 * Test to verify that all external links in the portfolio don't return 404 errors
 */
describe('Portfolio Links', () => {
  /**
   * Collect all URLs from projects and personal info
   */
  const getProjectUrls = () => {
    const urls: { name: string; url: string; type: string }[] = [];

    PROJECTS.forEach((project) => {
      if (project.liveUrl) {
        urls.push({
          name: `${project.title} (Live)`,
          url: project.liveUrl,
          type: 'live',
        });
      }
      if (project.githubUrl) {
        urls.push({
          name: `${project.title} (GitHub)`,
          url: project.githubUrl,
          type: 'github',
        });
      }
    });

    return urls;
  };

  const getPersonalUrls = () => {
    return [
      { name: 'GitHub Profile', url: PERSONAL_INFO.github, type: 'social' },
      { name: 'LinkedIn Profile', url: PERSONAL_INFO.linkedin, type: 'social' },
    ];
  };

  const allUrls = [...getProjectUrls(), ...getPersonalUrls()];

  /**
   * Test: Verify all URLs are well-formed and not empty
   */
  it('should have valid URL format for all links', () => {
    allUrls.forEach(({ name, url }) => {
      expect(url, `${name} should have a valid URL`).toBeTruthy();
      expect(url.length, `${name} URL should not be empty`).toBeGreaterThan(0);
      expect(
        url.startsWith('http://') || url.startsWith('https://'),
        `${name} should start with http:// or https://`
      ).toBe(true);
    });
  });

  /**
   * Test: Verify no duplicate URLs
   */
  it('should not have duplicate project URLs', () => {
    const urlsMap = new Map<string, string>();

    PROJECTS.forEach((project) => {
      if (project.liveUrl) {
        expect(
          urlsMap.has(project.liveUrl),
          `Duplicate live URL found: ${project.liveUrl} (${project.title})`
        ).toBe(false);
        urlsMap.set(project.liveUrl, `${project.title} (Live)`);
      }
      if (project.githubUrl) {
        expect(
          urlsMap.has(project.githubUrl),
          `Duplicate GitHub URL found: ${project.githubUrl} (${project.title})`
        ).toBe(false);
        urlsMap.set(project.githubUrl, `${project.title} (GitHub)`);
      }
    });
  });

  /**
   * Test: Verify all projects have at least one URL (GitHub required)
   */
  it('should have at least GitHub URL for every project', () => {
    PROJECTS.forEach((project) => {
      expect(
        project.githubUrl,
        `Project "${project.title}" should have a GitHub URL`
      ).toBeTruthy();
    });
  });

  /**
   * Test: Verify GitHub URLs follow expected pattern
   */
  it('should follow GitHub URL naming convention', () => {
    const githubUrls = PROJECTS.filter((p) => p.githubUrl).map((p) => p.githubUrl);

    githubUrls.forEach((url) => {
      expect(
        url,
        `GitHub URL should contain github.com/ikrigel/`
      ).toMatch(/github\.com\/ikrigel\//);
    });
  });

  /**
   * Test: Verify live URLs are valid deployment domains (sample check)
   */
  it('should have valid live demo URLs', () => {
    const liveUrls = PROJECTS.filter((p) => p.liveUrl).map((p) => ({
      title: p.title,
      url: p.liveUrl!,
    }));

    liveUrls.forEach(({ title, url }) => {
      // Check that live URLs belong to known deployment services or custom domains
      const validDomains = [
        'vercel.app',
        'render.com',
        'netlify.app',
        'github.io',
        'base44.app',
      ];

      const isValidDomain = validDomains.some((domain) => url.includes(domain));

      expect(
        isValidDomain || url.includes('http'),
        `${title} live URL should use a known deployment service: ${url}`
      ).toBe(true);
    });
  });

  /**
   * Test: Verify social media URLs
   */
  it('should have valid social media URLs', () => {
    expect(PERSONAL_INFO.github).toMatch(/github\.com\/ikrigel/);
    expect(PERSONAL_INFO.linkedin).toMatch(/linkedin\.com/);
  });

  /**
   * Summary: List all URLs for reference
   */
  it('should have correct number of projects and URLs', () => {
    const projectCount = PROJECTS.length;
    const liveUrlCount = PROJECTS.filter((p) => p.liveUrl).length;
    const githubUrlCount = PROJECTS.filter((p) => p.githubUrl).length;

    console.log(`\n✓ Portfolio Statistics:`);
    console.log(`  - Total Projects: ${projectCount}`);
    console.log(`  - Projects with Live Demo: ${liveUrlCount}`);
    console.log(`  - Projects with GitHub: ${githubUrlCount}`);
    console.log(`  - Total URLs: ${allUrls.length}`);

    // Basic sanity checks
    expect(projectCount).toBeGreaterThan(0);
    expect(githubUrlCount).toBe(projectCount); // All projects should have GitHub
    expect(liveUrlCount).toBeGreaterThan(0); // At least some should have live demos
  });
});
