// ─────────────────────────────────────────────────────────────────────
// Cambia el tag de la imagen Docker en EasyPanel y dispara deploy.
//
// Útil cuando EasyPanel cachea la imagen :latest y "Implementar" no pulla.
// Cambiar a un tag distinto (sha-XXX, main, fecha) fuerza fresh pull.
//
// Uso:
//   node scripts/easypanel-set-image.cjs <tag>
//   node scripts/easypanel-set-image.cjs main
//   node scripts/easypanel-set-image.cjs sha-0d1e499
//   node scripts/easypanel-set-image.cjs latest        # vuelve a :latest
// ─────────────────────────────────────────────────────────────────────

const puppeteer = require('C:/Users/GODSF/AppData/Roaming/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer');

const PANEL_URL = 'https://panel.wellcorefitness.com/';
const HAULED_URL = 'https://panel.wellcorefitness.com/projects/wellcorefitness/app/hauled';
const SOURCE_URL = HAULED_URL + '/source';
const EMAIL = process.env.EASYPANEL_EMAIL || 'info@wellcorefitness.com';
const PASS  = process.env.EASYPANEL_PASS  || 'fYCVgn4XZ7twq34';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const IMAGE_BASE = 'ghcr.io/analyticfitness-design/hauled';

const tag = process.argv[2] || 'latest';
const newImage = `${IMAGE_BASE}:${tag}`;
const headless = !process.argv.includes('--show');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log(`Setting image to: ${newImage}\n`);
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless,
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  try {
    // Login
    console.log('→ Login...');
    await page.goto(PANEL_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await sleep(1500);
    const email = await page.$('input[type="email"], input[name="email"]');
    const pass  = await page.$('input[type="password"], input[name="password"]');
    if (email && pass) {
      await email.type(EMAIL, { delay: 25 });
      await pass.type(PASS, { delay: 25 });
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(el =>
          /sign|log|iniciar|entrar/i.test(el.textContent || ''));
        if (btn) btn.click();
      });
      await sleep(4500);
    }

    // Source page
    console.log('→ Going to /source...');
    await page.goto(SOURCE_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await sleep(2500);

    // Click image input, clear, type new value
    console.log(`→ Setting image input to: ${newImage}`);
    const imgInput = await page.$('input[name="image"]');
    if (!imgInput) throw new Error('image input not found');
    await imgInput.click({ clickCount: 3 });
    await imgInput.press('Backspace');
    await imgInput.type(newImage, { delay: 20 });

    // Click Save (Guardar)
    const saved = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => /guardar|save/i.test((b.textContent || '').trim()));
      if (btn) { btn.click(); return btn.textContent.trim(); }
      return null;
    });
    console.log('  Save clicked:', saved);
    await sleep(3000);

    // Trigger deploy
    console.log('→ Triggering deploy...');
    await page.goto(HAULED_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await sleep(2000);
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => (b.textContent || '').trim() === 'Implementar');
      if (btn) btn.click();
    });
    await sleep(3500);
    console.log('  Deploy triggered, waiting 30s...');
    await sleep(30000);

    const shot = 'C:\\Users\\GODSF\\AppData\\Local\\Temp\\easypanel-set-image.jpg';
    await page.screenshot({ path: shot, type: 'jpeg', quality: 75 });
    console.log('  📸', shot);
    console.log('\n✓ Done.');
  } catch (err) {
    console.error('✗', err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
