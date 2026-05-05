// ─────────────────────────────────────────────────────────────────────
// Cambia el puerto target de los dominios en EasyPanel.
//
// El Dockerfile actual de Hauled bind a 3000, pero EasyPanel proxy
// estaba configurado para 80 (config vieja). Esto causa 502 Bad Gateway.
//
// Uso:  node scripts/easypanel-fix-port.cjs <nuevo_puerto>
// Ejemplo: node scripts/easypanel-fix-port.cjs 3000
// ─────────────────────────────────────────────────────────────────────

const puppeteer = require('C:/Users/GODSF/AppData/Roaming/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer');

const PANEL_URL  = 'https://panel.wellcorefitness.com/';
const HAULED_URL = 'https://panel.wellcorefitness.com/projects/wellcorefitness/app/hauled';
const EMAIL = process.env.EASYPANEL_EMAIL || 'info@wellcorefitness.com';
const PASS  = process.env.EASYPANEL_PASS  || 'fYCVgn4XZ7twq34';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const NEW_PORT = process.argv[2] || '3000';
const headless = !process.argv.includes('--show');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log(`Setting domain target port to: ${NEW_PORT}\n`);
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
    const email = await page.$('input[type="email"]');
    const pass = await page.$('input[type="password"]');
    if (email && pass) {
      await email.type(EMAIL, { delay: 25 });
      await pass.type(PASS, { delay: 25 });
      await page.evaluate(() => Array.from(document.querySelectorAll('button')).find(b => /sign|log|iniciar/i.test(b.textContent))?.click());
      await sleep(4500);
    }

    // Domains page
    console.log('→ Going to /domains...');
    await page.goto(HAULED_URL + '/domains', { waitUntil: 'networkidle2', timeout: 60000 });
    await sleep(2500);

    // Count domain rows
    const domainCount = await page.evaluate(() => {
      // Each domain row has a pencil edit icon (lucide-pencil or lucide-square-pen)
      return Array.from(document.querySelectorAll('button')).filter(b => {
        const svg = b.querySelector('svg');
        const cls = svg ? (svg.getAttribute('class') || '') : '';
        return cls.includes('lucide-pencil') || cls.includes('lucide-square-pen') || cls.includes('lucide-edit');
      }).length;
    });
    console.log(`  ${domainCount} edit pencils encontrados`);

    // For each domain, click pencil → change port → save
    for (let idx = 0; idx < domainCount; idx++) {
      console.log(`\n→ Editing domain #${idx + 1}...`);

      // Click the i-th pencil
      const opened = await page.evaluate((i) => {
        const pencils = Array.from(document.querySelectorAll('button')).filter(b => {
          const svg = b.querySelector('svg');
          const cls = svg ? (svg.getAttribute('class') || '') : '';
          return cls.includes('lucide-pencil') || cls.includes('lucide-square-pen') || cls.includes('lucide-edit');
        });
        if (pencils[i]) { pencils[i].click(); return true; }
        return false;
      }, idx);
      if (!opened) { console.log('  Pencil not found'); continue; }
      await sleep(2500);

      // Find a port-related input. Could be type=number with name "port" or similar
      const inputs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input')).map((el, i) => ({
          i, name: el.name || '', type: el.type || '',
          value: el.value || '', placeholder: el.placeholder || ''
        }));
      });
      console.log('  Inputs in modal:');
      inputs.forEach(i => console.log(`    [${i.i}] name="${i.name}" type="${i.type}" value="${i.value}" placeholder="${i.placeholder}"`));

      // Look for port input — name "port" or type=number with current value 80
      const portIdx = inputs.findIndex(i =>
        /port/i.test(i.name) ||
        (i.type === 'number' && (i.value === '80' || i.value === '3000'))
      );
      if (portIdx < 0) {
        console.log('  ⚠ Port input not found, dismissing modal');
        await page.keyboard.press('Escape');
        await sleep(1500);
        continue;
      }

      // Update the port
      const handles = await page.$$('input');
      await handles[portIdx].click({ clickCount: 3 });
      await handles[portIdx].press('Backspace');
      await handles[portIdx].type(NEW_PORT, { delay: 30 });
      console.log(`  Set port to ${NEW_PORT}`);

      // Click Save (Guardar)
      const saved = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"], .chakra-modal__content');
        if (!dialog) return null;
        const btn = Array.from(dialog.querySelectorAll('button')).find(b =>
          /guardar|save|aceptar|ok/i.test((b.textContent || '').trim()) &&
          !/cancelar|cancel/i.test((b.textContent || '').trim()));
        if (btn) { btn.click(); return btn.textContent.trim(); }
        return null;
      });
      console.log(`  Saved:`, saved);
      await sleep(3000);
    }

    await page.screenshot({ path: 'C:\\Users\\GODSF\\AppData\\Local\\Temp\\domains-fixed.jpg', type: 'jpeg', quality: 80, fullPage: true });
    console.log('\n✓ Domains updated.');
  } catch (err) {
    console.error('✗', err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
