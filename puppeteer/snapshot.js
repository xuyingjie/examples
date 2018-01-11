const { URL } = require('url');

async function snapshot({url, browser, device, dir}) {
    const page = await browser.newPage();
    await page.emulate(device);
    await page.goto(url);

    const hostname = new URL(url).hostname;
    await page.screenshot({path: `${dir}/${hostname}.png`});
}

module.exports = {
    snapshot
}
