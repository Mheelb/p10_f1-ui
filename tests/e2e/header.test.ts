import { test, expect } from '@playwright/test';

test('le logo s\'affiche sur le header de la page d\'accueil', async ({ page }: { page: import('@playwright/test').Page }) => {
    await page.goto("/");
    
    const logo = await page.locator('img[src="assets/images/logo.png"]');
    await expect(logo).toBeVisible();
});

test('le bouton retour fonctionne', async ({ page }: { page: import('@playwright/test').Page }) => {

    await page.goto("/");

    await page.goto(`/races`);
    
    const backButton = await page.locator('#back-button');
    await expect(backButton).toBeVisible();
  
    await backButton.click();
  
    await expect(page).toHaveURL("/");
});

test('le titre change en fonction de la page', async ({ page }: { page: import('@playwright/test').Page }) => {
    await page.goto(`/races`);
    const title = await page.locator('#page-title');
    await expect(title).toHaveText('races');
  
    await page.goto(`/account`);
    await expect(title).toHaveText('account');
});