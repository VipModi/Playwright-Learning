const { test, expect } = require('@playwright/test');
test('Accelevent Login Test', async ({ page }) => {
    await page.goto("https://www.accelevents.com/u/login");
    console.log(await page.title());
    await expect(page).toHaveTitle("Accelevents");
    await page.locator('#loginEmail').fill("vipul.m@brilworks.com");
    await page.locator('#logInAttempt').click();
    await page.locator('#inputLoginPassword').fill("Test@1234");
    await page.locator('').click();
    await page.locator('#logInAttempt').click();

});