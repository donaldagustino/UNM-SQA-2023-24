/*
ID: TC005
Test Case 5: Check if users can successfully take and save notes for each video.

Pre-Condition: The user is at (watch.html) or has clicked on a video at main page (index.html).

Procedure:
1. Start playing a video.
2. Enter text into the note-taking section.
3. Save the note.

Test Data: Note content (e.g., "Interesting point at 02:15")

Expected Result: The note is saved and associated with the video.
*/

//Place the below line into package.json scripts
//node testCase1.js && node testCase2.js && node testCase3.js && node testCase4.js && node testCase5.js && node testCase6.js


const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testCase5() {
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

    // Step 1: Start playing the video by clicking the video player itself
    const videoPlayer = await driver.findElement(By.css('#player')); // Adjust selector as needed
    await videoPlayer.click(); // This line simulates clicking the video player to start the video

    // Step 2: Enter text into the note-taking section
    const noteInput = await driver.findElement(By.id('videoNotes'));
    const testNote = "Interesting point at 02:15";

    // Scroll the note input into view
    await driver.executeScript("arguments[0].scrollIntoView(true);", noteInput);

    // Set the note content with JavaScript
    await driver.executeScript("arguments[0].value = arguments[1];", noteInput, testNote);

    // Step 3: Save the note
    const saveNoteButton = await driver.findElement(By.id('saveNoteButton'));
    // Scroll the save button into view
    await driver.executeScript("arguments[0].scrollIntoView(true);", saveNoteButton);
    // Use JavaScript to click the button if normal click doesn't work
    await driver.executeScript("arguments[0].click();", saveNoteButton);
    // Wait for the note to be saved
    await driver.sleep(5000); // Increase wait time if necessary

    // Verification: Retrieve the video ID from the URL
    const currentUrl = await driver.getCurrentUrl();
    const urlParams = new URLSearchParams(currentUrl);
    const videoId = urlParams.get('vId');

    // Verification: Check if the note is saved to local storage
    const savedNote = await driver.executeScript("return window.localStorage.getItem(arguments[0]);", 'videoNotes-' + videoId);
    assert.strictEqual(savedNote, testNote, 'The note content should be saved.');

    console.log('Test Case TC005 Passed: The note is saved and associated with the video.');

  } catch (error) {
    console.error('Test Case TC005 Failed:', error);
  } finally {
    await driver.quit();
  }
})();