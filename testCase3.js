/*
ID: TC003
Test Case 3: 
 Check if the YouTube video iframe is present and loaded.

Pre-Condition: The user has navigated to the dedicated video player page 
where a video should be loaded and ready to play.

Procedure:
• Navigate to the watch.html page with a specific video query parameter.
• Check for the presence of the YouTube iframe on the page.
• Optionally if using the YouTube Player API, verify that the video state is ready.

Expected Result: 
The YouTube iframe should be present, 
indicating that the video player has loaded. 
If using the YouTube Player API, 
the video state should be 'unstarted' or 'paused' 
(since autoplay should not be assumed).
*/

const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testCase3() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Pre-Condition: The user is on the watch.html page
    await driver.get('http://127.0.0.1:5500/watch.html?vId=IrWbKeLGi2A&keywords=SQA');

    // Procedure: Check for the presence of the YouTube iframe
    await driver.wait(until.elementLocated(By.css('iframe')), 10000);

    const iframe = await driver.findElement(By.css('iframe'));
    assert.ok(iframe, 'YouTube video iframe should be present.');

    // Expected Result: The iframe is present
    console.log('Test Case TC003 Passed: The YouTube video iframe is present and loaded.');

  } catch (error) {
    console.error('Test Case TC003 Failed:', error);
  } finally {
    // Close the browser after the test
    await driver.quit();
  }
})();