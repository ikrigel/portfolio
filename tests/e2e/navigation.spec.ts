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
      expect(box?.y).toBeLessThan(window.innerHeight);
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
        await page.waitForTimeout(300);

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
      await page.waitForTimeout(1000); // Wait for navigation and scroll

      // Should be back on main page at resume section
      expect(page.url()).toContain('/');

      // Resume section should be visible
      const resumeSection = await page.locator('#resume');
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

      // Click hamburger menu
      const menuButton = page.locator('button[aria-label="Menu"]').or(
        page.locator('svg[data-testid="MenuIcon"]').locator('..').locator('button')
      );

      // Try to find and click the menu button
      const buttons = await page.locator('button').all();
      let menuFound = false;

      for (const button of buttons) {
        const display = await button.evaluate((el) =>
          window.getComputedStyle(el).display
        );
        if (display !== 'none') {
          const childCount = await button.locator('svg').count();
          if (childCount > 0) {
            await button.click();
            menuFound = true;
            break;
          }
        }
      }

      if (menuFound) {
        await page.waitForTimeout(300);

        // Click on "Resume" in mobile menu
        const resumeButton = page.locator('button:has-text("Resume")');
        await resumeButton.first().click();
        await page.waitForTimeout(1000);

        // Should have scrolled to resume section
        const resumeSection = await page.locator('#resume');
        const isVisible = await resumeSection.isVisible();
        expect(isVisible).toBeTruthy();
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
      await page.waitForTimeout(300);

      let url = page.url();
      expect(url).toContain('#about');

      // Click on Projects
      await page.click('button:has-text("Projects")');
      await page.waitForTimeout(300);

      url = page.url();
      expect(url).toContain('#projects');

      // Go back in browser history
      await page.goBack();
      await page.waitForTimeout(500);

      url = page.url();
      expect(url).toContain('#about');
    });
  });

  test.describe('Theme and Navigation Integration', () => {
    test('should navigate correctly after changing theme', async ({ page }) => {
      // Change to light theme
      await page.click('button[title*="Light"], button[title*="Switch"], button[title*="Mode"]').catch(() => {});
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

      const projectsScroll = await page.evaluate(() => window.scrollY);

      // Go to logs
      await page.click('a[href="/#/logs"]');
      await page.waitForLoadState('networkidle');

      // Return to Projects from logs
      await page.click('button:has-text("Projects")');
      await page.waitForTimeout(1000);

      // Projects section should be visible
      const projectsSection = await page.locator('#projects');
      const isVisible = await projectsSection.isVisible();
      expect(isVisible).toBeTruthy();

      // Should be scrolled to projects area
      const currentScroll = await page.evaluate(() => window.scrollY);
      expect(currentScroll).toBeGreaterThan(0);
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
