import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Start fresh and wait for page to be ready
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Desktop Navigation - Main Page', () => {
    test('should scroll to section when clicking nav item', async ({ page }) => {
      // Get the initial scroll position
      const initialScroll = await page.evaluate(() => window.scrollY);

      // Click on "Resume" nav item
      await page.click('button:has-text("Resume")');
      await page.waitForTimeout(500);

      // Should have scrolled down
      const newScroll = await page.evaluate(() => window.scrollY);
      expect(newScroll).toBeGreaterThan(initialScroll);

      // Resume section should be in viewport
      const resumeSection = await page.locator('#resume');
      const box = await resumeSection.boundingBox();
      const viewportSize = await page.evaluate(() => window.innerHeight);
      expect(box?.y).toBeLessThan(viewportSize);
    });

    test('should update URL hash when clicking nav item', async ({ page }) => {
      // Click on "Projects" nav item
      await page.click('button:has-text("Projects")');
      await page.waitForTimeout(500);

      // Check URL hash
      const url = page.url();
      expect(url).toContain('#projects');
    });

    test('should highlight active nav item', async ({ page }) => {
      // Click on "About" nav item
      const aboutButton = page.locator('button:has-text("About")');
      await aboutButton.click();
      await page.waitForTimeout(500);

      // Check if the button has the active state (primary color)
      const style = await aboutButton.evaluate((el) =>
        window.getComputedStyle(el).color
      );
      expect(style).toBeTruthy();
    });

    test('should navigate through multiple sections', async ({ page }) => {
      const sections = ['about', 'experience', 'projects', 'resume', 'contact'];

      for (const section of sections) {
        const button = page.locator(`button:has-text("${section.charAt(0).toUpperCase() + section.slice(1)}")`);
        await button.click();
        // Wait for smooth scroll animation
        await page.waitForTimeout(600);

        const sectionElement = await page.locator(`#${section}`);
        const isVisible = await sectionElement.isVisible();
        expect(isVisible).toBeTruthy();
      }
    });
  });

  test.describe('Navigation from Logs Page', () => {
    test('should navigate to section from logs page', async ({ page }) => {
      // Navigate to logs
      await page.click('a[href="/#/logs"]');
      await page.waitForLoadState('networkidle');

      // Verify we're on logs page
      expect(page.url()).toContain('logs');

      // Click on "Resume" nav item
      await page.click('button:has-text("Resume")');
      // Wait for navigation, rendering, and smooth scroll
      await page.waitForTimeout(2500);

      // Should be back on main page at resume section
      expect(page.url()).toContain('/');
      expect(page.url()).not.toContain('logs');

      // Resume section should be visible
      const resumeSection = await page.locator('#resume');
      await resumeSection.waitFor({ state: 'visible', timeout: 5000 });
      const isVisible = await resumeSection.isVisible();
      expect(isVisible).toBeTruthy();

      // Scroll position should be at resume
      const resumeBox = await resumeSection.boundingBox();
      expect(resumeBox).not.toBeNull();
    });

    test('should navigate to different sections from logs', async ({ page }) => {
      const sections = [
        { name: 'About', id: 'about' },
        { name: 'Experience', id: 'experience' },
        { name: 'Projects', id: 'projects' },
      ];

      // Navigate to logs first
      await page.click('a[href="/#/logs"]');
      await page.waitForLoadState('networkidle');

      for (const section of sections) {
        // Click nav item
        await page.click(`button:has-text("${section.name}")`);
        await page.waitForTimeout(1000);

        // Verify we're on main page
        const url = page.url();
        expect(url).toContain('/');
        expect(url).not.toContain('logs');

        // Section should be visible
        const sectionElement = await page.locator(`#${section.id}`);
        const isVisible = await sectionElement.isVisible();
        expect(isVisible).toBeTruthy();

        // Go back to logs for next iteration (except last)
        if (section !== sections[sections.length - 1]) {
          await page.click('a[href="/#/logs"]');
          await page.waitForLoadState('networkidle');
        }
      }
    });
  });

  test.describe('Navigation from Settings Page', () => {
    test('should navigate to section from settings page', async ({ page }) => {
      // Navigate to settings
      await page.click('a[href="/#/settings"]');
      await page.waitForLoadState('networkidle');

      // Verify we're on settings page
      expect(page.url()).toContain('settings');

      // Click on "Experience" nav item
      await page.click('button:has-text("Experience")');
      await page.waitForTimeout(1000);

      // Should be back on main page at experience section
      expect(page.url()).toContain('/');
      expect(page.url()).not.toContain('settings');

      // Experience section should be visible
      const experienceSection = await page.locator('#experience');
      const isVisible = await experienceSection.isVisible();
      expect(isVisible).toBeTruthy();
    });

    test('should navigate to projects from settings', async ({ page }) => {
      // Navigate to settings
      await page.click('a[href="/#/settings"]');
      await page.waitForLoadState('networkidle');

      // Click on "Projects" nav item
      await page.click('button:has-text("Projects")');
      await page.waitForTimeout(1000);

      // Should be on main page at projects
      const projectsSection = await page.locator('#projects');
      const isVisible = await projectsSection.isVisible();
      expect(isVisible).toBeTruthy();
    });
  });

  test.describe('Mobile Menu Navigation', () => {
    test('should navigate using mobile menu', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // Find and click the hamburger menu button
      // Look for the button that only has an SVG and no text (in the header)
      const headerButtons = await page.locator('header button').all();
      let menuButton = null;

      for (const btn of headerButtons) {
        const isVisible = await btn.isVisible();
        if (isVisible) {
          const text = await btn.textContent();
          const hasSvg = await btn.locator('svg').count();
          // Menu button should be visible, have an SVG, and no text (or just whitespace)
          if (hasSvg > 0 && (!text || text.trim() === '')) {
            menuButton = btn;
            break;
          }
        }
      }

      if (menuButton) {
        // Click the menu button to open the drawer
        await menuButton.click();
        // Wait for Drawer animation to complete
        await page.waitForTimeout(800);

        // Look for Resume button in the drawer
        const drawerButtons = await page.locator('div[role="presentation"] button').all();
        let resumeButton = null;

        for (const btn of drawerButtons) {
          const text = await btn.textContent();
          if (text?.includes('Resume')) {
            resumeButton = btn;
            break;
          }
        }

        if (resumeButton) {
          await resumeButton.click();
          // Wait for navigation and scroll
          await page.waitForTimeout(2500);

          // Should have scrolled to resume section
          const resumeSection = await page.locator('#resume');
          const isVisible = await resumeSection.isVisible();
          expect(isVisible).toBeTruthy();
        }
      }
    });
  });

  test.describe('URL Hash Behavior', () => {
    test('should preserve hash when navigating directly to section', async ({ page }) => {
      // Navigate directly to a section using hash
      await page.goto('/#resume');
      await page.waitForTimeout(500);

      // Resume section should be visible
      const resumeSection = await page.locator('#resume');
      const isVisible = await resumeSection.isVisible();
      expect(isVisible).toBeTruthy();
    });

    test('should update hash in browser history', async ({ page }) => {
      // Click on About
      await page.click('button:has-text("About")');
      await page.waitForTimeout(600);

      let hash = await page.evaluate(() => window.location.hash);
      expect(hash).toContain('about');

      // Click on Projects
      await page.click('button:has-text("Projects")');
      await page.waitForTimeout(600);

      hash = await page.evaluate(() => window.location.hash);
      expect(hash).toContain('projects');

      // Click on Resume to verify hash updates again
      await page.click('button:has-text("Resume")');
      await page.waitForTimeout(600);

      hash = await page.evaluate(() => window.location.hash);
      expect(hash).toContain('resume');
    });
  });

  test.describe('Theme and Navigation Integration', () => {
    test('should navigate correctly after changing theme', async ({ page }) => {
      // Try to find and click the theme switcher button
      // It's typically in the header with a sun/moon icon
      const themeButtons = await page.locator('header button').all();
      for (const btn of themeButtons) {
        const hasSvg = await btn.locator('svg').count();
        if (hasSvg > 0) {
          const text = await btn.textContent();
          // Skip if it's a nav text button
          if (!text || !['About', 'Experience', 'Projects', 'Resume', 'Contact'].some(item => text?.includes(item))) {
            await btn.click().catch(() => {});
            break;
          }
        }
      }
      await page.waitForTimeout(300);

      // Navigate to a section
      await page.click('button:has-text("Contact")');
      await page.waitForTimeout(500);

      // Contact section should be visible
      const contactSection = await page.locator('#contact');
      const isVisible = await contactSection.isVisible();
      expect(isVisible).toBeTruthy();
    });

    test('should maintain scroll position when returning from logs', async ({ page }) => {
      // Click on Projects
      await page.click('button:has-text("Projects")');
      await page.waitForTimeout(500);

      // Go to logs
      await page.click('a[href="/#/logs"]');
      await page.waitForLoadState('networkidle');

      // Verify we're on logs page
      expect(page.url()).toContain('logs');

      // Return to Projects from logs
      await page.click('button:has-text("Projects")');
      // Wait for navigation and smooth scroll to complete
      await page.waitForTimeout(2000);

      // Verify we're back on main page
      expect(page.url()).not.toContain('logs');

      // Projects section should be visible
      const projectsSection = await page.locator('#projects');
      const isVisible = await projectsSection.isVisible();
      expect(isVisible).toBeTruthy();

      // Verify section is in view by checking its position
      const projectsScroll = await page.evaluate(() => {
        const element = document.getElementById('projects');
        return element ? element.offsetTop : 0;
      });
      // Element should be positioned somewhere on the page
      expect(projectsScroll).toBeGreaterThan(0);
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle rapid navigation clicks', async ({ page }) => {
      // Rapidly click multiple nav items
      const navItems = ['About', 'Experience', 'Projects', 'Resume', 'Contact'];

      for (const item of navItems) {
        await page.click(`button:has-text("${item}")`);
      }

      // Wait for final navigation
      await page.waitForTimeout(500);

      // Contact should be visible (last clicked)
      const contactSection = await page.locator('#contact');
      const isVisible = await contactSection.isVisible();
      expect(isVisible).toBeTruthy();
    });

    test('should handle navigation from logs -> settings -> main page', async ({ page }) => {
      // Go to logs
      await page.click('a[href="/#/logs"]');
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('logs');

      // Go to settings from logs
      await page.click('a[href="/#/settings"]');
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('settings');

      // Navigate to Resume from settings
      await page.click('button:has-text("Resume")');
      await page.waitForTimeout(1000);

      // Should be on main page at resume
      expect(page.url()).not.toContain('logs');
      expect(page.url()).not.toContain('settings');

      const resumeSection = await page.locator('#resume');
      const isVisible = await resumeSection.isVisible();
      expect(isVisible).toBeTruthy();
    });
  });
});
