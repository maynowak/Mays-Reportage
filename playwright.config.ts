import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 90_000,
  fullyParallel: false,
  workers: 1,
  expect: { timeout: 10_000 },
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4317',
    reducedMotion: 'reduce',
    trace: 'off',
    screenshot: 'off',
  },
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://127.0.0.1:4317',
    reuseExistingServer: true,
    timeout: 300_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
