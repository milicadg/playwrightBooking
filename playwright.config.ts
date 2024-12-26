import  { PlaywrightTestConfig, devices } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests/',
  /* Maximum time one test can run for. */
  timeout: 30 * 3000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 55000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  metadata: {
    product: 'Monocart',
    env: 'STG',
    type: 'Regression',
    executor: 'Mono',
    
    
    // test home page object model
    url: 'https://www.npmjs.org/package/monocart-reporter'
  },
  reporter: [
    ['monocart-reporter', {  
        name: 'My Test Report',
        //outputFile: './playwright-monocart-report/index.html'
        outputFile: './playwright-report/index.html'
        // trend: './playwright-monocart-report/index.json'
    }],
    ['list'],
    ['html', { open: 'never' }]
  ],
  outputDir: 'test-results',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://automationintesting.online',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    },
    storageState: 'playwright/.auth/userAuth.json'
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { 
      name: 'setup', 
      testMatch: 'authentication.setup.ts'
    },
    {
      name: 'ExecuteInChrome',
      testDir: './tests/',
      dependencies: ['setup'],
      use: {
        headless:true,
        video: 'on',
        screenshot: 'only-on-failure',
        ...devices['Desktop Chrome']
      }
     },
    {
      name: 'ExecuteInFF',
      testDir: './tests/',
      dependencies: ['setup'],
      use: {
        headless: true,
        video: 'on',
        screenshot: 'only-on-failure',
        ...devices['Desktop Firefox']
      }
    },
    {
      name: 'ExecuteInSafari',
      testDir: './tests/',
      dependencies: ['setup'],
      use: {
        headless: true,
        video: 'on',
        screenshot: 'only-on-failure',
        ...devices['Desktop Safari']
      }
    }
  ]
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
