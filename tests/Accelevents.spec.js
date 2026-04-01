const { test, expect } = require('@playwright/test');
test('Accelevent Login Test', async ({ page }) => {

    // 0. Navigate to the URL
    await page.goto("https://www.accelevents.com/u/login");
    console.log(await page.title());
    await expect(page).toHaveTitle("Accelevents");

    // 1. Locate the email field and continue button
    const emailField = page.locator('#loginEmail');
    const continueBtn = page.locator('#logInAttempt');
    const passwordField = page.locator('#inputLoginPassword');

    // 2. verify button initially disabled
    await expect(continueBtn).toBeDisabled();

    // 3. enter email
    await emailField.fill("vipul.m@brilworks.com");

    // 4. trigger blur event
    await emailField.press('Tab');

    // 5. verify button enabled
    await expect(continueBtn).toBeEnabled();

    // 6. click button
    await continueBtn.click();

    // 7. enter password
    await passwordField.fill("Test@1234");

    // 8. click button
    await continueBtn.click();

});