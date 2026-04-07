const { test, expect } = require('@playwright/test');

test('Register on Practice automation', async ({ page }) => {

    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("vipulmodiqa@gmail.com");
    await page.locator('#userPassword').fill("Test@1234");
    await page.locator('#login').click();
    // await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }
    await page.locator("button[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator(`h3:has-text('${productName}')`).isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("input[placeholder='Select Country']").pressSequentially("ind", { delay: 100 });
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor();
    const countryCount = await dropdown.locator(".ta-item").count();
    for (let i = 0; i < countryCount; i++) {
        const text = await dropdown.locator(".ta-item").nth(i).textContent();
        if (text.trim() === "India") {
            await text.nth(i).click();
            break;
        }
    }
    await page.pause();
});
