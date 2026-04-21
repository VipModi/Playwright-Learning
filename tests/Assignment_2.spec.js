/** What you are testing: Create a brand new event from the admin panel, then complete a booking for that event, and finally verify the seat count drops by exactly 1.

Setup
- BASE_URL = https://eventhub.rahulshettyacademy.com
- Credentials: < Create your own credentials>
- Write a reusable login(page) helper function — you will call it at the start of the test

Steps
Step 1 — Login
- Navigate to /login
- Fill email field (locate by placeholder you@email.com)
- Fill password field (locate by label Password)
- Click the login button (locate by id #login-btn)
- Assert: link with text Browse Events → is visible (confirms login success)

Step 2 — Create a new event
- Navigate to /admin/events
- Generate a unique event title using Test Event ${Date.now()} — store this in a variable, you will need it throughout the test
- Fill Title field (locate by id #event-title-input)
- Fill Description textarea (locate using #admin-event-form textarea)
- Fill City field (locate by label City)
- Fill Venue field (locate by label Venue)
- Fill Event Date & Time field (locate by label Event Date & Time) — use your futureDateValue() helper
- Fill Price ($) field (locate by label Price ($)) — use any number e.g. 100
- Fill Total Seats field (locate by label Total Seats) — use 50
- Click the submit button (locate by id #add-event-btn)
- Assert: toast message Event created! is visible

Step 3 — Find the event card and capture seats
- Navigate to /events
- Get all event cards (locate by data-testid="event-card")
- Assert the first card is visible (confirms page loaded)
- From all cards, filter for the one that contains your event title text
- Assert the matched card is visible (timeout 5 seconds)
- Read the seat count text from that card (locate element containing text seat, parse integer from its inner text) — store this as seatsBeforeBooking

Step 4 — Start booking
- On the matched event card, click the Book Now button (locate by data-testid="book-now-btn" inside the card)

Step 5 — Fill booking form
- Assert: element with id #ticket-count has text 1 (default quantity)
- Fill Full Name (locate by label Full Name)
- Fill Email (locate by id #customer-email)
- Fill Phone (locate by placeholder +91 98765 43210)
- Click the confirm button (locate by CSS class .confirm-booking-btn)

Step 6 — Verify booking confirmation
- Locate the booking reference element (locate by CSS class .booking-ref, take .first())
- Assert it is visible
- Read its inner text, trim it — store as bookingRef

Step 7 — Verify in My Bookings
- Click the link View My Bookings
- Assert: URL is BASE_URL/bookings
- Get all booking cards (locate by id #booking-card)
- Assert the first booking card is visible
- Filter booking cards for the one that contains an element with class .booking-ref matching your bookingRef text
- Assert that matched card is visible
- Assert that matched card contains your eventTitle text

Step 8 — Verify seat reduction
- Navigate back to /events
- Assert the first event card is visible
- Filter cards again using hasText: eventTitle
- Assert the card is visible
- Read the seat count text again (same as Step 3) — store as seatsAfterBooking
- Assert: seatsAfterBooking === seatsBeforeBooking - 1

Questions for this assignment
Complete the Playwright code for given manual Instructions. */

function futureDateValue() {
    const date = new Date();

    date.setDate(date.getDate() + 5); // 5 days in future

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hours = "10";
    const minutes = "30";

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const { test, expect } = require('@playwright/test');

test('Step 1 — Login', async ({ page }) => {
    const baseURL = "https://eventhub.rahulshettyacademy.com";
    const userEmail = "vipulmodiqa@gmail.com";
    const userPassword = "Test@1234";
    await page.goto(baseURL);
    await page.getByPlaceholder('you@email.com').fill(userEmail);
    await page.getByLabel('password').fill(userPassword);
    //await page.locator('#login-btn').click();
    await page.getByRole('button', { name: 'Sign In' }).click();
    const isVisible = expect(page.getByRole('link', { name: 'Browse Events' }).isVisible());
    expect(isVisible).toBeTruthy();

    //'Step 2 — Create a new event'

    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'Manage Events' }).first().click();
    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator('#event-title-input').fill(eventTitle);
    await page.locator('#admin-event-form textarea').fill("This is a text discription are filled up by Vipul");
    await page.getByLabel('city').fill('Ahmedabad');
    await page.getByLabel('Venue').fill('SanskarDham, SamratNagar, Isanpur - 382443');
    await page.getByLabel('Event Date & Time').fill(futureDateValue());
    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');
    await page.locator('#add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();
});

// test('Step 2 — Create a new event', async ({ page }) => {
//     console.log(await page.url());
//     console.log("Hello Vipul");
// });
