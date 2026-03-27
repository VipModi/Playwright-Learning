const { test, expect } = require('@playwright/test');
test.only('Reddit Login page Error Message Test & Logged In Test', async ({ browser }) => {
    const contest = await browser.newContext();
    const page = await contest.newPage();
    await page.goto("https://www.reddit.com");
    await page.reload();
    // await page.getByRole('button', { name: /downvote/i }).first().click(); // hERE I = IGNORE CASE 
    await page.locator('[class=" group button flex justify-center aspect-square p-0 border-0 button-secondary disabled:text-interactive-content-disabled button-plain  inline-flex items-center hover:text-action-downvote focus-visible:text-action-downvote"]').first().click();
    await page.locator('[step="login"]').click();

    // await page.locator("#login-button").click();
    await page.waitForTimeout(3000); // only for debugging
    // const username = page.locator('input[name="username"]');
    const username = page.locator('input[type="text"]').nth(2);
    const password = page.locator('input[name="password"]').nth(0);

    //Fill username and password with wrong credentials
    await username.fill("lss_mobile_931");
    await password.fill("asdfasdf");

    await page.locator('button.login').click();
    await page.waitForTimeout(3000);

    await page.locator('text=Invalid username or password.')
    console.log("Error message is visible");

    //Re fill username and password with wrong credentials
    await username.fill("");
    await username.fill("lss_mobile_9301");
    console.log("Entered correct username");

    await password.fill("");
    await password.fill("asdfasdf1234");
    console.log("Entered correct password");

    await page.locator('button.login').click();
    await page.waitForTimeout(3000);

    await expect(page.locator('[alt="User Avatar"]')).toBeVisible();
    console.log("Logged in as lss_mobile_9301");



    //click on community page from PDP view
    await page.locator('a.subreddit-name').first().click();
    console.log("Clicked on community page");
    await page.waitForTimeout(3000);

    //Get Dynamic Community name in variable
    const CommunityName = await page.locator('h1.text-neutral-content-strong').first().innerText();
    console.log("Get Community name");

    //Validation Assertions for community page
    await expect(CommunityName).toContain('r/');
    await page.waitForTimeout(3000);

    //Print the community name in console
    console.log('Community name is: ' + CommunityName);

    //Validation Assertions for URL
    await expect(page).toHaveURL(/\/r\/.+/);
    await page.waitForTimeout(3000);

    //Get URL
    const CommunityURL = page.url();

    //Print Community URL in console
    console.log('Community URL is:', + CommunityURL);


    console.log("Success fully navigaated to community page");

});