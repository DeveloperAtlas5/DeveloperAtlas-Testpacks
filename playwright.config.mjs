import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    headless: true,
  },
  webServer: {
    command: 'node scripts/serve-static.mjs',
    port: 4173,
    reuseExistingServer: false,
    timeout: 15_000,
  },
})
