import { test, expect, Page } from '@playwright/test';

test.describe('Composant RaceCard', () => {
    test.beforeEach(async ({ page }: { page: Page }) => {
        await page.goto('/races');
    });

    test('Vérifier qu’une carte de course à venir s’affiche', async ({ page }: { page: Page }) => {
        const firstRace = page.locator('.race-card').first();
        await expect(firstRace).toBeVisible();

        await expect(firstRace.locator('text=Round')).toBeVisible();

        await expect(firstRace.locator('h1')).toBeVisible();
        await expect(firstRace.locator('h1')).toHaveText(/^[A-Z][a-z]+(?:['-]?[A-Za-z]+)*(?: [A-Z][a-z]+(?:['-]?[A-Za-z]+)*)*$/);

        const dateSection = firstRace.locator('.date-section');
        await expect(dateSection.locator('h3')).toBeVisible();
        await expect(dateSection.locator('h3')).toHaveText(/^\d{2}$/);

        const monthChip = dateSection.locator('.chip');
        await expect(monthChip).toBeVisible();
        await expect(monthChip.locator('p')).toHaveText(/^[A-Z][a-z]{2}$/);
    });

    test('Vérifier qu’une carte de course passées s’affiche', async ({ page }: { page: Page }) => {
        const pastTab = await page.locator('text=Past');
        pastTab.click();

        const firstRace = page.locator('.race-card').first();
        await expect(firstRace).toBeVisible();

        await expect(firstRace.locator('text=Round')).toBeVisible();

        await expect(firstRace.locator('h1')).toBeVisible();
        await expect(firstRace.locator('h1')).toHaveText(/^[A-Z][a-z]+(?:['-]?[A-Za-z]+)*(?: [A-Z][a-z]+(?:['-]?[A-Za-z]+)*)*$/);

        const p10Chip = firstRace.locator('text=P10');
        await expect(p10Chip).toBeVisible();

        const trigram = firstRace.locator('.trigram');
        await expect(trigram).toBeVisible();
        await expect(trigram.locator('.team-color-rectangle')).toBeVisible();
        await expect(trigram.locator('h3')).toBeVisible();
        await expect(trigram.locator('h3')).toHaveText(/^[A-Z]{3}$/);
        await expect(trigram.locator('.team-color-rectangle')).toHaveCSS('background-color', /rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/);

        const dateSection = firstRace.locator('.date-section');
        await expect(dateSection.locator('h3')).toBeVisible();
        await expect(dateSection.locator('h3')).toHaveText(/^\d{2}$/);

        const monthChip = dateSection.locator('.chip');
        await expect(monthChip).toBeVisible();
        await expect(monthChip.locator('p')).toHaveText(/^[A-Z][a-z]{2}$/);
    });

    test('Cliquer sur une carte de course passé et vérifier la navigation', async ({ page }: { page: Page }) => {

        const pastTab = await page.locator('text=Past');
        pastTab.click();

        const firstPastRace = page.locator('.race-card').filter({ hasText: 'P10' }).first();
        await expect(firstPastRace).toBeVisible();
    
        await firstPastRace.click();
    
        await expect(page).toHaveURL(/\/races\/\d+/);
    });
});