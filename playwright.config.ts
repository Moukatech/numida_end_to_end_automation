import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  workers: 4,
  testDir: './tests',
  reporter: [
      ['html'],
      ['json', { outputFile: 'reports/results.json' }],
      ['allure-playwright', { outputFolder: 'allure-results',detail:true }]
    ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5001',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'ui',
      testMatch: /ui-test\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'api',
      testMatch: /api-tests\/.*\.spec\.ts/,
      use: {
        baseURL: process.env.BASE_URL || 'http://localhost:5001',
        extraHTTPHeaders: {
          'Content-Type': 'application/json'
        }
      }
    }


  ],

});
