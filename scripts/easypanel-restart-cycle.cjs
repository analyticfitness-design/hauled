// ─────────────────────────────────────────────────────────────────────
// Stop → Start cycle en EasyPanel (fuerza fresh pull de imagen).
//
// Cuando "Implementar" no funciona porque EasyPanel cachea la imagen,
// hacer Stop + Start fuerza recreación del contenedor con docker pull fresco.
//
// Uso:  node scripts/easypanel-restart-cycle.cjs [--show]
// ─────────────────────────────────────────────────────────────────────

const puppeteer = require('C:/Users/GODSF/AppData/Roaming/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer');

const PANEL_URL  = 'https://panel.wellcorefitness.com/';
const HAULED_URL = 'https://panel.wellcorefitness.com/projects/wellcorefitness/app/hauled';
const EMAIL      = process.env.EASYPANEL_EMAIL || 'info@wellcorefitness.com';
const PASS       = process.env.EASYPANEL_PASS  || 'fYCVgn4XZ7twq34';
const CHROME     = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const headless = !process.argv.includes('--show');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function login(page) {
  await page.goto(PANEL_URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(1500);
  const email = await page.$('input[type="email"]');
  const pass = await page.$('input[type="password"]');
  if (!email || !pass) return;
  await email.type(EMAIL, { delay: 25 });
  await pass.type(PASS, { delay: 25 });
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(el =>
      /sign|log|iniciar|entrar/i.test(el.textContent || ''));
    if (btn) btn.click();
  });
  await sleep(4500);
}

// Inventory all action-row icon buttons (in the top action toolbar)
async function inventory(page) {
  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map((b, i) => {
      const r = b.getBoundingClientRect();
      const svg = b.querySelector('svg');
      return {
        i,
        text: (b.textContent || '').trim(),
        title: b.title || b.getAttribute('aria-label') || '',
        svgClass: svg ? (svg.getAttribute('class') || '') : '',
        x: Math.round(r.x), y: Math.round(r.y),
        w: Math.round(r.width), h: Math.round(r.height)
      };
    });
  });
}

// Find a button by SVG class substring
async function clickBySvg(page, svgKeyword) {
  return page.evaluate((kw) => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => {
      const svg = b.querySelector('svg');
      return svg && (svg.getAttribute('class') || '').includes(kw);
    });
    if (btn) { btn.click(); return true; }
    return false;
  }, svgKeyword);
}

// Confirm a destructive action (modal "Confirmar")
async function confirmModal(page) {
  await sleep(1500);
  return page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"], .chakra-modal__content');
    if (!dialog) return null;
    const btns = Array.from(dialog.querySelectorAll('button'));
    const ok = btns.find(b => /confirmar|confirm|sí|yes|aceptar|ok/i.test((b.textContent||'').trim())
                            && !/cancelar|cancel/i.test((b.textContent||'').trim()));
    if (ok) { ok.click(); return ok.textContent.trim(); }
    return null;
  });
}

(async () => {
  console.log('EasyPanel restart cycle (Stop → Start)\n');
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless,
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  try {
    console.log('→ Login...');
    await login(page);
    console.log('  ✓');

    console.log('→ Navigating to hauled...');
    await page.goto(HAULED_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await sleep(2500);

    // Inventory all icons to find Stop and Start
    const all = await inventory(page);
    const actionRow = all.filter(b => b.svgClass.includes('lucide') && !b.text && b.y > 80 && b.y < 250 && b.x > 400);
    console.log('\nAction row icons found:');
    actionRow.forEach(b => console.log(`  i=${b.i} svg="${b.svgClass.split(' ').slice(1, 3).join(' ')}" title="${b.title}" pos=(${b.x},${b.y})`));

    // Try Stop first (square icon)
    console.log('\n→ Click STOP (square icon)...');
    let stopped = await clickBySvg(page, 'lucide-square ');
    if (!stopped) stopped = await clickBySvg(page, 'lucide-square"');
    if (!stopped) stopped = await clickBySvg(page, 'lucide-power');
    console.log('  Stop clicked:', stopped);

    if (stopped) {
      const c = await confirmModal(page);
      if (c) console.log('  Confirmed:', c);
      console.log('  Esperando 8s para que pare...');
      await sleep(8000);
    }

    // Now Start (Implementar)
    console.log('\n→ Click IMPLEMENTAR (start)...');
    const started = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => (b.textContent || '').trim() === 'Implementar');
      if (btn) { btn.click(); return true; } return false;
    });
    console.log('  Start clicked:', started);

    const startedConfirm = await confirmModal(page);
    if (startedConfirm) console.log('  Confirmed:', startedConfirm);

    console.log('\n→ Waiting 35s for fresh container...');
    await sleep(35000);

    const shot = 'C:\\Users\\GODSF\\AppData\\Local\\Temp\\easypanel-restart-cycle.jpg';
    await page.screenshot({ path: shot, type: 'jpeg', quality: 75 });
    console.log('  📸', shot);
    console.log('\n✓ Cycle done.');
  } catch (err) {
    console.error('✗', err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
