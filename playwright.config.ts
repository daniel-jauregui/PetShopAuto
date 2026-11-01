import { defineConfig, devices } from '@playwright/test';
import { defineBddProject } from 'playwright-bdd';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }]],

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      ...defineBddProject({
        name: 'apiProject',
        features: './tests/api/**/*.feature',
        steps: ['./tests/api/fixtures.ts', './tests/api/steps/**/*.ts'],
      }),
      use: {
        baseURL: process.env.API_URL ?? 'http://localhost:8000',
      },
    },
    {
      ...defineBddProject({
        name: 'chromeProject',
        features: './tests/ui/**/*.feature',
        steps: ['./tests/ui/pages/fixtures.ts', './tests/ui/steps/**/*.ts'],
      }),
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_URL ?? 'http://localhost:8000',
      },
    },
  ],
});
