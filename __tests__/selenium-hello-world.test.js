// Setup the driver
const {Builder, By, Key} = require('selenium-webdriver');
const driver = new Builder().forBrowser('chrome').build();

async function helloWorld() {
  // Go to google
  await driver.get('https://google.com');

  // Get the search field element
  let searchBox;
  await driver.findElement(By.name('q')).then(function(element) {
    searchBox = element;
    console.log('Found search box');
  });

  // Search for hello world
  console.log('Searching for hello world');
  await searchBox.sendKeys('Hello World!');
  await searchBox.sendKeys(Key.RETURN);

  // Print out details about the current page
  await driver.getTitle().then((title) => console.log('Title: ' + title));
  await driver.getCurrentUrl().then((url) => console.log('URL: ' + url));

  // Print out the search result headers
  await driver.findElements(By.className('LC20lb')).then((elements) => {
    console.log('search results:');
    for (let i = 0; i < elements.length; i++) {
      elements[i].getText().then((text) => console.log(text));
    }
  });

  driver.quit();
}

helloWorld();
