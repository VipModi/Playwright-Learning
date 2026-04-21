const { test, expect } = require('@playwright/test');
const { assert } = require('node:console');

test.only('Instagram Login Test', async ({ page }) => {
    const bday = '10/27/1999';
    const monthNumber = "10";
    const dateNumber = "27";
    const yearNumber = "1999";
    await page.goto("https://demoqa.com/date-picker");
    await page.locator('//input[@id="datePickerMonthYearInput"]').click();
    await page.locator(".react-datepicker__year-select").selectOption(yearNumber);
    await page.locator('.react-datepicker__month-select').selectOption((monthNumber - 1).toString());
    await page.locator('[class="react-datepicker__month"]').getByText(dateNumber).last().click();
    await expect(page.locator('#datePickerMonthYearInput')).toHaveValue(bday);
});