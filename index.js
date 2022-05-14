const puppeteer = require('puppeteer');
const jsonfile = require('jsonfile');

(async () => {
  try {
    const browser = await puppeteer.launch(); // like launching a browser
    const page = await browser.newPage(); // create a tab in browser
    await page.goto('https://www.thesaurus.com/browse');
    console.log('Page Loaded');

    //   await page.screenshot({ path: 'google.png' }); // take a screenshot of webpage

    // extract single element
    // https://www.w3schools.com/cssref/css_selectors.asp
    const singleItem = await page.$eval(
      'a[href^="https://www.thesaurus.com/browse"]', // [attribute^="value"] // select elements
      (el) => el.innerText
    );

    console.log(singleItem);

    // all most searched words
    const multiItem = await page.$$eval(
      'a[href^="https://www.thesaurus.com/browse"]',
      (elements) => elements.map((el) => el.innerText)
    );

    console.log(multiItem);

    // save file
    jsonfile.writeFile('trending.json', { words: multiItem }, (err) => {
      if (err) {
        console.log(err);
      }
    });

    await browser.close(); // close to stop script
  } catch (error) {
    console.log(error);
  }
})();
