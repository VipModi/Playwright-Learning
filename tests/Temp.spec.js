const { test, expect } = require('@playwright/test');

test.only('Instagram Login Test', async ({ page }) => {
    const temp = "| 69d92752f86ba51a6559c098 |";
    console.log(temp.split(" ")[1]);
});