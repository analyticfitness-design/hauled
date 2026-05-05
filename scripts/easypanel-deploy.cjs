// ─────────────────────────────────────────────────────────────────────
// EasyPanel deploy trigger — Hauled Frontend
//
// Hace login en panel.wellcorefitness.com y dispara una nueva implementación.
//
// Uso:
//   node scripts/easypanel-deploy.cjs           # Click "Implementar"
//   node scripts/easypanel-deploy.cjs --rebuild # Click hammer (force pull)
//   node scripts/easypanel-deploy.cjs --restart # Restart container
//   node scripts/easypanel-deploy.cjs --show    # Browser visible (debug)
//
// Credenciales: env EASYPANEL_EMAIL / EASYPANEL_PASS
// ─────────────────────────────────────────────────────────────────────

const puppeteer = require('C:/Users/GODSF/AppData/Roaming/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer');

const PANEL_URL  = 'https://panel.wellcorefitness.com/';
const HAULED_URL = 'https://panel.wellcorefitness.com/projects/wellcorefitness/app/hauled';
const EMAIL      = process.env.EASYPANEL_EMAIL || 'info@wellcorefitness.com';
const PASS       = process.env.EASYPANEL_PASS  || 'fYCVgn4XZ7twq34';
const CHROME     = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const mode = process.argv.includes('--rebuild') ? 'rebuild'
           : process.argv.includes('--restart') ? 'restart'
           : 'deploy';
const headless = !process.argv.includes('--show');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function login(page) {
  console.log('→ Login...');
  await page.goto(PANEL_URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(1500);
  const email = await page.$('input[type="email"], input[name="email"]');
  const pass  = await page.$('input[type="password"], input[name="password"]');
  if (!email || !pass) { console.log('  Already logged in'); return; }
  await email.type(EMAIL, { delay: 25 });
  await pass.type(PASS, { delay: 25 });
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(el =>
      /sign|log|iniciar|entrar/i.test(el.textContent || ''));
    if (btn) btn.click();
  });
  await sleep(4500);
  console.log('  ✓ Logged in');
}

const actions = {
  deploy: (page) => page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => (b.textContent || '').trim() === 'Implementar');
    if (btn) { btn.click(); return true; } return false;
  }),
  rebuild: (page) => page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => {
      const svg = b.querySelector('svg');
      return svg && (svg.getAttribute('class') || '').includes('lucide-hammer');
    });
    if (btn) { btn.click(); return true; } return false;
  }),
  restart: (page) => page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b =>
      /restart|reiniciar/i.test(b.title || b.getAttribute('aria-label') || ''));
    if (btn) { btn.click(); return true; } return false;
  }),
};

async function dismissModal(page) {
  await sleep(1500);
  return page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"], .chakra-modal__content');
    if (!dialog) return null;
    const btns = Array.from(dialog.querySelectorAll('button'));
    const ok = btns.find(b => /implementar|deploy|confirmar|confirm|ok|sí|yes/i.test((b.textContent||'').trim())
                            && !/cancelar|cancel/i.test((b.textContent||'').trim()));
    if (ok) { ok.click(); return ok.textContent.trim(); }
    return null;
  });
}

(async () => {
  console.log(`EasyPanel deploy — mode=${mode}\n`);
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless,
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  try {
    await login(page);
    console.log('→ Navigating to hauled service...');
    await page.goto(HAULED_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await sleep(2500);

    const action = actions[mode];
    if (!action) throw new Error(`Modo desconocido: ${mode}`);

    const clicked = await action(page);
    console.log(`→ Click ${mode}:`, clicked);
    if (!clicked) throw new Error(`Botón "${mode}" no encontrado`);

    const confirmed = await dismissModal(page);
    if (confirmed) console.log('  Modal confirmado:', confirmed);

    await sleep(3500);
    console.log('\n→ Acción disparada. Esperando 25s para que termine...');
    await sleep(25000);

    const shot = 'C:\\Users\\GODSF\\AppData\\Local\\Temp\\easypanel-deploy-status.jpg';
    await page.screenshot({ path: shot, type: 'jpeg', quality: 75 });
    console.log('  📸 Estado:', shot);
    console.log('\n✓ Acción completada.');
  } catch (err) {
    console.error('✗ Error:', err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
