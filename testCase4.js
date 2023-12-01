/*
ID: TC004
Test Case 4: 
User can type keywords into the search bar
on both the main page and the dedicated video player page.

Pre-Condition: The user is on either the main page or the
video player page.

Procedure:
1. Locate the search bar on the main page.
2. Try the default button named SQA, Python and Learning into the search bar.
3. Verify that the input was successful.
4. Navigate to the video player page.
5. Locate the search bar on the video player page.
6. Type the keyword "Testing" into the search bar.
7. Verify that the input was successful.

Test Data: Example keyword (e.g., "Testing")

Expected Result: 
Keyword is accepted in the search bar on both pages and the page will update their videos respectively.
*/

const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testCase4() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Test search on main page
    await driver.get('http://127.0.0.1:5500/index.html');
    await testKeywordButton(driver, 'SQA');
    await testKeywordButton(driver, 'Learning');
    await testKeywordButton(driver, 'Python');

     // Test search functionality by typing 'Testing' and clicking 'Add'
     await testSearchFunctionality(driver, 'Testing');

    // Test search on video player page
    await driver.get('http://127.0.0.1:5500/watch.html?vId=IrWbKeLGi2A&keywords=SQA');
    // Test by clicking predefined 'SQA' button and check sidebar update
    await testSidebarUpdate(driver, 'SQA');
    // Add new 'Testing' keyword and check sidebar update
    await addNewKeywordAndTestSidebar(driver, 'Testing');

    console.log('Test Case TC004 Passed: Keyword accepted on both main and video player pages.');
    console.log('Test Case TC004 Passed: Keyword also correctly updates video lists.');

  } catch (error) {
    console.error('Test Case TC004 Failed:', error);
  } finally {
    await driver.quit();
  }
})();

//Default Keyword of 'SQA' 'Learning' 'Python'
async function testKeywordButton(driver, keyword) {
  let originalTitles = await getVideoTitles(driver);
  let button = await driver.findElement(By.xpath(`//button[text()='${keyword}']`));
  await button.click();

  // Verifying the video list update
  await driver.sleep(1000); // Wait for a second for the list to update
  let updatedTitles = await getVideoTitles(driver);
  assert.notDeepStrictEqual(originalTitles, updatedTitles, 'Video titles should update after clicking keyword button.');
}

//For other keywords
async function testSearchFunctionality(driver, keyword) {
  const searchInput = await driver.findElement(By.id('search-input'));
  await searchInput.sendKeys(keyword);

  let addButton = await driver.findElement(By.xpath("//button[text()='Add']"));
  await addButton.click();

  let button = await driver.findElement(By.xpath(`//button[text()='${keyword}']`));
  await button.click();

  // Verifying the video list update
  await driver.sleep(1000); // Wait for a second for the list to update
  let updatedTitles = await getVideoTitles(driver);
  let isKeywordPresent = updatedTitles.some(title => title.includes(keyword));
  assert(isKeywordPresent, `The keyword ${keyword} should be present in the updated video titles.`);
}

//Check if video title on main page is changed
async function getVideoTitles(driver) {
  let titles = [];
  let elements = await driver.findElements(By.css('#video-grid .video-item p'));
  for (let element of elements) {
    let title = await element.getText();
    titles.push(title);
  }
  return titles;
}

//For watch.html page
// Function to test sidebar update when clicking predefined keyword buttons
async function testSidebarUpdate(driver, keyword) {
  let originalSidebarTitles = await getSidebarVideoTitles(driver);
  let button = await driver.findElement(By.xpath(`//button[text()='${keyword}']`));
  await button.click();
  
  await driver.sleep(1000); // Wait for the sidebar to update

  let updatedSidebarTitles = await getSidebarVideoTitles(driver);
  assert.notDeepStrictEqual(originalSidebarTitles, updatedSidebarTitles, 'Sidebar titles should update after clicking predefined keyword button.');
}

// Function to add a new keyword and test sidebar update
async function addNewKeywordAndTestSidebar(driver, keyword) {
  const searchInput = await driver.findElement(By.id('search-input'));
  await searchInput.sendKeys(keyword);
  let addButton = await driver.findElement(By.xpath("//button[text()='Add']"));
  await addButton.click();
  
  await driver.sleep(1000); // Wait for the sidebar to update

  let updatedSidebarTitles = await getSidebarVideoTitles(driver);
  let isKeywordPresent = updatedSidebarTitles.some(title => title.includes(keyword));
  assert(isKeywordPresent, `The keyword ${keyword} should be present in the updated sidebar video titles.`);
}

// Function to get the titles of the sidebar videos
async function getSidebarVideoTitles(driver) {
  let titles = [];
  let elements = await driver.findElements(By.css('#side-videos .video p'));
  for (let element of elements) {
    let title = await element.getText();
    titles.push(title);
  }
  return titles;
}