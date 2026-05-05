// ─────────────────────────────────────────────────────────────────────
// Verificación live de hauled.shop
//
// Audita el sitio contra una lista esperada de productos / precios.
// Sale con exit code 0 si fresh, 2 si stale (deploy outdated).
//
// Uso:
//   node scripts/verify-live.cjs
//   node scripts/verify-live.cjs --url https://hauled.shop/
// ─────────────────────────────────────────────────────────────────────

const puppeteer = require('C:/Users/GODSF/AppData/Roaming/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer');

const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : null;
};
const BASE = arg('--url') || 'https://hauled.shop/';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TMP = 'C:\\Users\\GODSF\\AppData\\Local\\Temp';

// Productos eliminados (no deberían aparecer)
const EXCLUDED_TITLES = [
  'Track Suit Pants V2',
  'Gasp Track Pants',
  'Washed Baggy Pants',
  'Legacy Gym Tee',
  'Original Cut Out',
];

// Precios viejos (TRM 4200 sin descuento)
const OLD_PRICE_TOKENS = ['$226,800', '$268,800', '$373,800', '$415,800', '$499,800', '$541,800', '$310,800'];

// Precios nuevos (TRM 3650, 15% off)
const NEW_PRICE_TOKENS = [
  '$198,560', '$307,148', '$369,198', '$167,535', '$136,510',
  '$120,998', '$245,098', '$152,023', '$105,485', '$400,223'
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log(`Verifying ${BASE}\n`);
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-cache']
  });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  console.log('→ Loading home...');
  const home = await page.goto(BASE + '?_=' + Date.now(), { waitUntil: 'networkidle2', timeout: 60000 });
  console.log('  HTTP:', home.status());
  await sleep(2500);
  await page.screenshot({ path: `${TMP}\\verify_home.jpg`, type: 'jpeg', quality: 80 });
  console.log('  <title>:', await page.title());

  const fav = await page.goto(BASE + 'favicon.svg?_=' + Date.now()).catch(() => null);
  console.log('  favicon.svg:', fav ? fav.status() : 'unreachable');

  console.log('\n→ Loading /shop...');
  const shop = await page.goto(BASE + 'shop?_=' + Date.now(), { waitUntil: 'networkidle2', timeout: 60000 });
  console.log('  HTTP:', shop.status());
  await sleep(2500);
  await page.screenshot({ path: `${TMP}\\verify_shop.jpg`, type: 'jpeg', quality: 80, fullPage: true });

  const data = await page.evaluate(() => {
    const text = document.body.innerText;
    const prices = [...new Set(text.match(/\$[\d.,]{4,}/g) || [])];
    const titles = Array.from(document.querySelectorAll('h1, h2, h3, .tp-product-title-2, [class*="title"]'))
      .map(el => (el.textContent || '').trim())
      .filter(t => t.length > 5 && t.length < 100);
    return { prices, titles: [...new Set(titles)] };
  });

  console.log('\n  Productos (' + data.titles.length + '):');
  data.titles.forEach(t => console.log('    •', t));
  console.log('\n  Precios:');
  data.prices.forEach(p => console.log('    •', p));

  console.log('\n─── AUDIT ───');
  const stale = EXCLUDED_TITLES.filter(ex => data.titles.some(t => t.includes(ex)));
  const oldP  = OLD_PRICE_TOKENS.filter(p => data.prices.some(d => d.includes(p)));
  const newP  = NEW_PRICE_TOKENS.filter(p => data.prices.some(d => d.includes(p)));

  if (stale.length) {
    console.log('  ⚠ Productos eliminados que aún aparecen:');
    stale.forEach(s => console.log('    ✗', s));
  } else {
    console.log('  ✓ Productos eliminados ya no aparecen');
  }

  if (oldP.length) {
    console.log('  ⚠ Precios viejos (TRM 4200) detectados:');
    oldP.forEach(p => console.log('    ✗', p));
  } else {
    console.log('  ✓ Sin precios viejos');
  }

  console.log(`  ${newP.length > 0 ? '✓' : '⚠'} Precios nuevos (TRM 3650 -15%): ${newP.length}/${NEW_PRICE_TOKENS.length}`);

  const isFresh = stale.length === 0 && oldP.length === 0 && newP.length > 0;
  console.log('\n  Estado:', isFresh ? '✅ DEPLOY FRESH' : '❌ DEPLOY STALE — re-trigger needed');

  await browser.close();
  process.exitCode = isFresh ? 0 : 2;
})();
