const { test, expect } = require('@playwright/test');
test("Getby locators practice", async ({ page }) => {
    const userName = "Test@gmail.com";
    const password = "Test@1234";
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByLabel("Employed").check();
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText(" The Form has been submitted successfully!.").isVisible();
    await page.getByRole('Link', { name: "Shop" }).click();
    await page.locator('.card').filter({ hasText: "Nokia Edge" }).getByRole('button').click();
    // await page.pause();
});
