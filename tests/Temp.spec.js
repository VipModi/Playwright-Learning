const { test, expect } = require('@playwright/test');

test.only('Instagram Login Test', async ({ page }) => {
    await page.goto("https://instagram.com");
    console.log(await page.title());
    await page.pause();
    console.log(await page.locator('[name="email"]').inputValue());
});