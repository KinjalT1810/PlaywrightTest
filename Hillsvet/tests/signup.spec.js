const { chromium } = require('playwright');

const TOTAL_USERS = 50;
const CONCURRENT_USERS = 5;

const SIGNUP_URL = 'https://app.middleware.io/signup';

async function createUser(index) {

    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    const email = `kinjal+${Date.now()}_${index}@qable.io`;

    const password = 'Test@12345';

    try {

        const start = Date.now();

        // Wait for signup API response
        const responsePromise = page.waitForResponse(response =>
            response.url().includes('/auth/rwe') &&
            response.request().method() === 'POST'
        );

        // Open signup page
        await page.goto(SIGNUP_URL, {
            waitUntil: 'networkidle'
        });

        // Fill form
        await page.fill('input[name="full_name"]', 'Performance Test');

        await page.fill('input[name="email"]', email);

        await page.fill('input[name="password"]', password);

        // Optional wait for captcha generation
        await page.waitForTimeout(3000);

        // Submit button
        await page.click('button[type="submit"]');

        // Capture API response
        const response = await responsePromise;

        const responseBody = await response.text();

        const end = Date.now();

        console.log('\n===================================');
        console.log(`USER: ${index + 1}`);
        console.log(`EMAIL: ${email}`);
        console.log(`STATUS: ${response.status()}`);
        console.log(`TIME: ${end - start} ms`);
        console.log(`RESPONSE: ${responseBody}`);
        console.log('===================================\n');

        return {
            success: response.status() < 400,
            status: response.status(),
            time: end - start
        };

    } catch (err) {

        console.log(`USER ${index + 1} FAILED`);
        console.log(err.message);

        return {
            success: false,
            error: err.message
        };

    } finally {

        await browser.close();

    }
}

async function runPerformanceTest() {

    const results = [];

    for (
        let i = 0;
        i < TOTAL_USERS;
        i += CONCURRENT_USERS
    ) {

        const batch = [];

        for (
            let j = i;
            j < i + CONCURRENT_USERS && j < TOTAL_USERS;
            j++
        ) {

            batch.push(createUser(j));

        }

        console.log(`\nRUNNING BATCH ${i / CONCURRENT_USERS + 1}\n`);

        const batchResults = await Promise.all(batch);

        results.push(...batchResults);
    }

    // Final Summary

    const successCount =
        results.filter(r => r.success).length;

    const failedCount =
        results.filter(r => !r.success).length;

    const responseTimes =
        results
            .filter(r => r.time)
            .map(r => r.time);

    const avgTime =
        responseTimes.length
            ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
            : 0;

    console.log('\n=========== FINAL REPORT ===========');

    console.log(`TOTAL USERS: ${TOTAL_USERS}`);

    console.log(`SUCCESS: ${successCount}`);

    console.log(`FAILED: ${failedCount}`);

    console.log(`AVERAGE RESPONSE TIME: ${avgTime.toFixed(2)} ms`);

    console.log('====================================\n');
}

runPerformanceTest();