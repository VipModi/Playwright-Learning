const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./APIUtils/APIUtils');

const loginPayLoad = { userEmail: "vipulmodiqa@gmail.com", userPassword: "Test@1234" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }

let NewOrderID;

test.beforeAll(async () => {

    const ApiContext = await request.newContext();
    const apiutils = new APIUtils(ApiContext, loginPayLoad);
    NewOrderID = await apiutils.cerateOrder(orderPayLoad);

});


test('Register on Practice automation', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, NewOrderID.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('.table [scope="row"]').first().waitFor();
    const orderIds = await page.locator('.table [scope="row"]').allTextContents();
    for (let i = 0; i < orderIds.length; ++i) {
        //if(orderIds[i].includes(orderId)){
        if (orderIds[i] === NewOrderID.orderId) {
            await expect(page.locator(".table [scope='row']").nth(i)).toHaveText(NewOrderID.orderId);
            await page.locator("[class='btn btn-primary']").nth(i).click();
            break;
        }
    }
    const OrderIDDetais = await page.locator(".col-text").textContent();
    await expect(OrderIDDetais.includes(NewOrderID.orderId)).toBeTruthy();

});