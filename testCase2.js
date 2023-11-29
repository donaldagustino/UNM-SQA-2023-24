/*
Test Case 2: Ensure that clicking on the video thumbnail or title 
brings the user to the dedicated player area, 
within the same tab with a sidebar for other videos.

Pre-Condition: User is on the main page with videos
displayed.

Procedure:
• 	Click on the thumbnail of any displayed video.
• 	Observe the navigation and layout change.

Expected Result: The application navigates to a
dedicated player area within the same tab, and a sidebar with
other videos are visible.
*/ 

const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testCase2() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://127.0.0.1:5500/index.html'); 
    await driver.wait(until.elementsLocated(By.css('.video-item')), 10000);

    // Wait for video content to be visible
    const firstVideoThumbnail = await driver.findElement(By.css('#video-grid a:first-child'));
    await firstVideoThumbnail.click();

    await driver.wait(until.urlContains('watch.html'), 10000);

    // Wait for dynamic content to be visible
    await driver.wait(until.elementLocated(By.css('.notes-section')), 10000); // Wait for notes section
    await driver.wait(until.elementLocated(By.id('player')), 10000); // Wait for video player

    const sidebar = await driver.findElement(By.id('side-videos'));
    await driver.wait(until.elementIsVisible(sidebar), 10000); // Wait until sidebar is visible

    const isSidebarVisible = await sidebar.isDisplayed();
    assert(isSidebarVisible, 'Sidebar with other videos should be visible.');

    console.log('Test Case TC002 Passed: Clicking a video thumbnail navigates to the player area with sidebar.');

  } catch (error) {
    console.error('Test Case TC002 Failed:', error);
  } finally {
    await driver.quit();
  }
})();