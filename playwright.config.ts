import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',  // Dossier où sont stockés les tests E2E
  timeout: 30000,          // Temps d'attente maximum pour chaque test
  retries: 2,              // Nombre de réessais en cas d'échec
  workers: 4,              // Nombre de workers (tests parallèles)
  use: {
    headless: true,       // Lancer les tests en mode non-headless
    screenshot: 'on-failure',  // Prendre une capture d'écran en cas d'échec
    video: 'on-first-retry',  // Enregistrer une vidéo du test lors du premier échec
    baseURL: 'http://host.docker.internal:3000',  // L'URL de base de ton app
    outputDir: './playwright-report',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});