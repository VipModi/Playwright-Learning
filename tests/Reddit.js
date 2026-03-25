const { test, expect } = require('@playwright/test');
test('Reddit Login Playwright Test', async ({ browser }) => {
    const contest = await browser.newContext();
    const page = await contest.newPage();
    await page.goto("https://www.reddit.com");
    await page.locator('#login-button').click();
    await page.locator('input[name="username"]').fill("lss_mobile_9301");
    await page.locator('input[name="password"]').fill("asdfasdf12");
    await page.locator('button.login').click();
    await expect(page.locator('[alt="User Avatar"]')).toBeVisible();

}
);