const { test, expect, request } = require("@playwright/test");
// const { url } = require("node:inspector");
// const { json } = require("node:stream/consumers");
const loginPayLoad = { userEmail: "vipulmodiqa@gmail.com", userPassword: "Test@1234" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }
let token;
let orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayLoad
        }
    )
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })

    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];
});

test.beforeEach(() => {

});

test('Testing API testing', async ({ page }) => {

    await page.addInitScript(value => { window.localStorage.setItem('token', value); }, token);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('.table [scope="row"]').first().waitFor();
    const orderIds = await page.locator('.table [scope="row"]').allTextContents();
    for (let i = 0; i < orderIds.length; ++i) {
        //if(orderIds[i].includes(orderId)){
        if (orderIds[i] === orderId) {
            await expect(page.locator(".table [scope='row']").nth(i)).toHaveText(orderId);
            await page.locator("[class='btn btn-primary']").nth(i).click();
            break;
        }
    }
    const OrderIDDetais = await page.locator(".col-text").textContent();
    await expect(OrderIDDetais.includes(orderId)).toBeTruthy();


});