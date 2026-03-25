const { test, expect } = require('@playwright/test');

test.only('Instagram Login Test', async ({ page }) => {
    await page.goto("https://instagram.com");
    console.log(await page.title());
    await page.locator('#_R_32d9lplkldcpbn6b5ipamH1_').fill("mwb.testing");
    await page.locator("[name='pass']").fill("igd@123");
    await expect(page.locator('.x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft')).toBeEnabled();
    await page.locator('.x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft').click();
});
