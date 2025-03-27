import { test, expect } from '@playwright/test';

test('la page d\'accueil se charge correctement', async ({ page }: { page: import('@playwright/test').Page }) => {
  await page.goto("/");

  const betCard = await page.locator('.bet-card');
  await expect(betCard).toBeVisible();
});

test('la page a une image de fond', async ({ page }: { page: import('@playwright/test').Page }) => {
    await page.goto("/");

    const bgImageDiv = await page.locator('.bg-image');
    const backgroundImage = await bgImageDiv.evaluate((el: HTMLElement) => window.getComputedStyle(el).backgroundImage);
    
    expect(backgroundImage).not.toBe('none');
});

//test betCard

test('les informations de la course sont affichées', async ({ page }: { page: import('@playwright/test').Page }) => {
    await page.goto("/");
    
    const country = await page.locator('#country-name');
    await expect(country).toBeVisible();
    
    const grandPrix = await page.locator('#grand-prix-name');
    await expect(grandPrix).toBeVisible();
    
    const circuitImage = await page.locator('#circuit-image');
    await expect(circuitImage).toBeVisible();
  });

// test('si l n\'y a pas de pari, le button affiche bet', async ({ page }: { page: import('@playwright/test').Page }) => {

// });

// test('si l\'utilisateur a parié, le button affiche change', async ({ page }: { page: import('@playwright/test').Page }) => {

// });

test('le bouton de pari redirige vers la page de pari', async ({ page }: { page: import('@playwright/test').Page }) => {
    await page.goto("/");
    
    const betButton = await page.locator("#bet-button");
    await expect(betButton).toBeVisible();
    
    await betButton.click();
    
    await expect(page).toHaveURL(`/bet`);
    
  });

test('le timer est présent', async ({ page }: { page: import('@playwright/test').Page }) => {
    await page.goto("/");
    
    const timer = await page.locator('.timer');
    await expect(timer).toBeVisible();
    
});