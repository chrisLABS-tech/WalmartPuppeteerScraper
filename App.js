const puppeteer = require('puppeteer');
const twilio = require('twilio');

const client = new twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

async function run() {
  
  let browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  try {
    await page.setViewport({width: 1280, height: 800});
    await page.goto('https://www.walmart.com/ip/Xbox-Series-X/443574645');
    await page.waitForSelector('button.prod-ProductCTA--primary');
    const data = await page.evaluate(() => document.querySelector('button.prod-ProductCTA--primary').innerText);
   if (data == 'Add to cart') {
    await page.click('button.prod-ProductCTA--primary');
    client.messages.create({
      to: '5037663698',
      from: '5037663798',
      body: 'Your Walmart item has been added to the cart. Please check out'
    });
    await page.waitFor(10000);

   }
    await page.close();
    await browser.close();
}
  catch (error) {
    console.log('failed to open the page with error ' + error);
  }
}
run();