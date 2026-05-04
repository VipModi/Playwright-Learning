const { test, expect } = require('@playwright/test');


test("Popup validationns", async ({ page }) => {
    await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com");
    await page.goBack();
    await page.goForward();
})