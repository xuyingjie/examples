const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const DEVICE = devices['iPhone 6'];
const DIR = 'snapshot';

const {snapshot} = require('./snapshot');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const conf = {
        browser,
        device: DEVICE,
        dir: DIR,
    };
    await snapshot({url: 'https://pessoa.cn', ...conf});


    await browser.close();
})();
