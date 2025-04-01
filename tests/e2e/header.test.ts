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

test('le header affiche une section tab pour les courses au click change bien de tab', async ({ page }: { page: import('@playwright/test').Page }) => {
    await page.goto(`/races`);
    
    const upcomingTab = await page.locator('text=Upcoming');
    const pastTab = await page.locator('text=Past');
  
    await expect(upcomingTab).toBeVisible();
    await expect(pastTab).toBeVisible();
  
    await pastTab.click();
  
    await expect(upcomingTab).not.toHaveClass(/active/);
    await expect(pastTab).toHaveClass(/active/);

    await upcomingTab.click();

    await expect(upcomingTab).toHaveClass(/active/);
    await expect(pastTab).not.toHaveClass(/active/);
});