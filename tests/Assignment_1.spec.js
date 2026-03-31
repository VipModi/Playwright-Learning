const { test, expect } = require('@playwright/test');

test('Register on Practice automation', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("vipulmodiqa@gmail.com");
    await page.locator('#userPassword').fill("Test@1234");
    await page.locator('#login').click();
    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    console.log(await page.locator('.card-body b').allTextContents());
});
