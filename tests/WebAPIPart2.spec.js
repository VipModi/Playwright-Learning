const { test, expect } = require('@playwright/test');

let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("vipulmodiqa@gmail.com");
    await page.locator("#userPassword").fill("Test@1234");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Verify products shows up based on the search query', async () => {

    const productName = 'ZARA COAT 3';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator('.card-body');
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
            await dropdown.locator(".ta-item").nth(i).click();
            break;
        }
    }
    await page.locator('.field [type="text"]').nth(1).fill(123 + "");
    await page.locator('.field [type="text"]').nth(2).fill("Vipul Modi");
    await page.locator("input[name='coupon']").fill("rahulshettyacademy");
    await page.locator("button[type='submit']").click();
    await expect(page.locator('text="* Coupon Applied"')).toBeVisible();
    console.log(await page.locator('text="* Coupon Applied"').textContent());
    await page.locator(".actions .btnn").click();
    await expect(page.locator("text=Thankyou for the order.")).toBeVisible();
    console.log(await page.locator("text=Thankyou for the order.").textContent());
    let testOrder = await page.locator("label[class='ng-star-inserted']").textContent();
    testOrder = testOrder.split(" ")[2];
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('.table [scope="row"]').first().waitFor();
    const orderIds = await page.locator('.table [scope="row"]').allTextContents();
    for (let i = 0; i < orderIds.length; ++i) {
        //if(orderIds[i].includes(testOrder)){
        if (orderIds[i] === testOrder) {
            await expect(page.locator(".table [scope='row']").nth(i)).toHaveText(testOrder);
            await page.locator("[class='btn btn-primary']").nth(i).click();
            break;
        }
    }
    const OrderIDDetais = await page.locator(".col-text").textContent();
    await expect(OrderIDDetais.includes(testOrder)).toBeTruthy();


});
