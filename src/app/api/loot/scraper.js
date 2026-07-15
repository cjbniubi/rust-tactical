const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();

chromium.use(stealth);

const entity = process.argv[2] || 'apc-crate';
const url = `https://wiki.rustclash.com/entity/${entity}`;

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    await page.waitForSelector('table.table-hover', { timeout: 20000 });
    
    const extractedData = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table.table-hover tbody tr'));
        return rows.map(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 4) return null;
            
            const itemNameNode = cells[1] ? cells[1].innerText.trim() : 'Unknown';
            const quantity = cells[3] ? cells[3].innerText.trim() : '1';
            const chance = cells[4] ? cells[4].innerText.trim() : '0%';
            
            return {
                name: itemNameNode,
                quantity: quantity,
                chance: chance
            };
        }).filter(item => item !== null && item.name !== 'Unknown');
    });

    await browser.close();
    console.log(JSON.stringify({ success: true, data: extractedData }));
  } catch (err) {
    console.error(JSON.stringify({ success: false, error: err.message }));
    process.exit(1);
  }
})();
