/*
ID: TC001
Test Case 1:
Opening the main user interface 
displays 12 YouTube videos with thumbnails and titles.

Pre-Condition: User has accessed the main page of the
application.

Procedure:
• 	Open the web application.
• 	Observe the main user interface.

Expected Result: 12 YouTube videos are displayed,
each with a thumbnail image and a title.
*/ 


const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testCase1() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigate to local web application's URL
    await driver.get('http://127.0.0.1:5500/index.html'); 

    // Wait until the video grid is populated with video items
    await driver.wait(until.elementsLocated(By.css('.video-item')), 10000);

    // Find all video items in the video grid
    let videoItems = await driver.findElements(By.css('#video-grid > a'));

    // Check if there are exactly 12 video items
    assert.strictEqual(videoItems.length, 12, 'There should be exactly 12 videos displayed.');

    // Cheach video item for a thumbnail and a title
    for (const videoItem of videoItems) {
      let thumbnail = await videoItem.findElement(By.css('img')).getAttribute('src');
      let title = await videoItem.findElement(By.css('p')).getText();

      // Assert that each video item has a non-empty thumbnail URL and title
      assert(thumbnail.length > 0, 'Video thumbnail should have a non-empty src attribute.');
      assert(title.length > 0, 'Video title should be non-empty.');
    }

    console.log('Test Case TC001 Passed: All 12 videos with thumbnails and titles are displayed.');

  } catch (error) {
    console.error('Test Case TC001 Failed:', error);
  } finally {
    // Close the browser after the test
    await driver.quit();
  }
})();