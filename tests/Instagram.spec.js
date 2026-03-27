const { test, expect } = require('@playwright/test');

test.only('Instagram Login Test', async ({ page }) => {
    await page.goto("https://instagram.com");
    console.log(await page.title());
    await page.locator('[name="email"]').fill("testing_arm_9");
    await page.locator("[name='pass']").fill("armadillo");
    await page.locator('[aria-label="Log In"]').click();
    await page.locator('text="Not now"').click();
    await expect(page.locator('[alt="testing_arm_9\'s profile picture"]')).toBeVisible();
    console.log("Done");
});
