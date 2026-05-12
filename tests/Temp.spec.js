// const { test, expect } = require('@playwright/test');
// const { assert } = require('node:console');

// test.only('Instagram Login Test', async ({ page }) => {
//     const bday = '10/27/1999';
//     const monthNumber = "10";
//     const dateNumber = "27";
//     const yearNumber = "1999";
//     await page.goto("https://demoqa.com/date-picker");
//     await page.locator('//input[@id="datePickerMonthYearInput"]').click();
//     await page.locator(".react-datepicker__year-select").selectOption(yearNumber);
//     await page.locator('.react-datepicker__month-select').selectOption((monthNumber - 1).toString());
//     await page.locator('[class="react-datepicker__month"]').getByText(dateNumber).last().click();
//     await expect(page.locator('#datePickerMonthYearInput')).toHaveValue(bday);
// });

const { test, expect, request } = require('@playwright/test');
const PayLoadLogin = { userEmail: "bunnyshanon786@gmail.com", userPassword: "Sneh@2511" }
const OrderPayload = {
    orders: [
        {
            country: "India",
            productOrderedId: "6960eae1c941646b7a8b3ed3"
        }
    ]
}
let token;
let orderId;

test.beforeAll(async () => {

    const ApiContext = await request.newContext();
    const LoginResponse = await ApiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: PayLoadLogin });
    expect(LoginResponse.ok()).toBeTruthy();
    const LoginResponseJson = await LoginResponse.json();
    token = LoginResponseJson.token;
    console.log(token);

    const OrderResponse = await ApiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: OrderPayload,
        headers: {
            'Authorization': token,
            'Content-Type': "application/json"
        },

    })
    const OrderResponseJson = await OrderResponse.json();
    orderId = OrderResponseJson.orders[0];
    console.log(orderId);

});

test.beforeEach(() => {

});

test('Register on Practice automation', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

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
