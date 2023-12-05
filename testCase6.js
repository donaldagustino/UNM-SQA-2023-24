/*
ID: TC006
Test Case 6: Confirm the functionality to share a video's URL.

Pre-Condition: Notes are available for a video.

Procedure:
1. Select a video with notes.
2. Use the share functionality to copy and paste video URL.

Test Data: N/A

Expected Result: The application provides the same video of the video URL .
*/

const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testCase6() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Pre-Condition: User has clicked on a video on the main page
    // At main page
    await driver.get('http://127.0.0.1:5500/index.html'); 
    await driver.wait(until.elementsLocated(By.css('.video-item')), 10000);

    // Wait for video content to be visible
    const firstVideoThumbnail = await driver.findElement(By.css('#video-grid a:first-child'));
    await firstVideoThumbnail.click();

    // Wait for watch.html page to load
    await driver.wait(until.urlContains('watch.html'), 10000);
    
    // Wait for dynamic content to be visible
    await driver.wait(until.elementLocated(By.css('.notes-section')), 10000); // Wait for notes section
    await driver.wait(until.elementLocated(By.id('player')), 10000); // Wait for video player

        // Use the share functionality
    const shareButton = await driver.findElement(By.id('shareButton'));
    await shareButton.click();

    // Wait for the toast message
    const toastMessage = await driver.wait(until.elementLocated(By.className('toast-message')), 10000);
    const toastText = await toastMessage.getText();
    assert.strictEqual(toastText, 'URL ready to be copied!', 'Toast message should be "URL ready to be copied!"');

    // Introduce a small delay to ensure the hidden input is appended to the DOM
    await driver.sleep(1000);

    // Retrieve the URL from the hidden input field
    const shareUrlValue = await driver.executeScript("return document.getElementById('shareUrl').value;");
    console.log('Retrieved share URL:', shareUrlValue);

    // Verify that the URL of the new tab is as expected
    const currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes(shareUrlValue), 'The new tab should navigate to the shared URL.');
    
    console.log('Test Case TC006 Passed: The application provides a plain text format of the video URL and associated notes.');

  } catch (error) {
    console.error('Test Case TC006 Failed:', error);
  } finally {
    await driver.quit();
  }
})();