const { test, expect } = require('@playwright/test');

test('Browser Context Playwright Test', async ({ browser }) => {
    const context = await browser.newContext();
    const Page = await context.newPage();
    const userName = Page.locator('#username');
    const password = Page.locator('[type="password"]');
    const signIn = Page.locator('[name="signin"]');
    const cardTitle = Page.locator('.card-title a');
    await Page.goto("https://rahulshettyacademy.com/loginpagepractise/");
    console.log(await Page.title() + ' Vipul');
    await userName.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await Page.locator("[style*='block']").textContent());
    await expect(Page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await Page.locator('[name="signin"]').click();
    await signIn.click();
    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(3).textContent());
    // allTextContents(); method is 
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles);
});

test('Page Playwright Test', async ({ page }) => {
    //const context = await browser.newContext();
    //const Page = await context.newPage();
    await page.goto("https://www.google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test.only('Register on Practice automation', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagepractise/");
    const userName = page.locator('#username');
    const password = page.locator('[type="password"]');
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption("consult");
    await expect(dropdown).toHaveValue("consult");
    await page.locator(".radiotextsty").last().click();
    await expect(page.locator("#okayBtn")).toBeVisible();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#okayBtn").click();
    // await page.locator("#terms").click();
    await page.locator("#terms").check();
    console.log("Terms and condition checkbox is checked: ", await page.locator('#terms').isChecked());
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    console.log("Terms and condition checkbox is checked: ", await page.locator('#terms').isChecked());
    await page.locator("#signInBtn").click();
});