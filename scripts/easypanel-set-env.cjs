// ─────────────────────────────────────────────────────────────────────
// Cambia una variable de entorno en EasyPanel.
//
// Uso:  node scripts/easypanel-set-env.cjs <KEY=value> [<KEY2=value2>...]
// Ejemplo: node scripts/easypanel-set-env.cjs PORT=80
// ─────────────────────────────────────────────────────────────────────

const puppeteer = require('C:/Users/GODSF/AppData/Roaming/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer');

const PANEL_URL = 'https://panel.wellcorefitness.com/';
const HAULED_URL = 'https://panel.wellcorefitness.com/projects/wellcorefitness/app/hauled';
const EMAIL = process.env.EASYPANEL_EMAIL || 'info@wellcorefitness.com';
const PASS  = process.env.EASYPANEL_PASS  || 'fYCVgn4XZ7twq34';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const headless = !process.argv.includes('--show');
const sleep = ms => new Promise(r => setTimeout(r, ms));

const updates = process.argv.slice(2).filter(a => a.includes('=') && !a.startsWith('--'));
if (updates.length === 0) {
  console.error('Uso: node scripts/easypanel-set-env.cjs KEY=value [KEY2=value2...]');
  process.exit(1);
}

(async () => {
  console.log('Updates:', updates.join(' '));
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless,
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  try {
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

    console.log('→ Going to /environment...');
    await page.goto(HAULED_URL + '/environment', { waitUntil: 'networkidle2' });
    await sleep(2500);

    // Get current env content from the editor
    // EasyPanel usa Monaco editor for env vars
    const currentEnv = await page.evaluate(() => {
      // Try to get from Monaco editor
      const monacoDom = document.querySelector('.monaco-editor');
      if (monacoDom) {
        // Read all .view-line elements
        const lines = Array.from(document.querySelectorAll('.view-line')).map(l => l.textContent || '');
        return lines.join('\n');
      }
      // Fall back to textarea
      const ta = document.querySelector('textarea');
      return ta ? ta.value : '';
    });
    console.log('Current env:\n' + currentEnv);

    // Build new env with updates applied
    let newEnv = currentEnv;
    for (const upd of updates) {
      const [k, v] = upd.split('=', 2);
      const re = new RegExp(`^${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=.*$`, 'm');
      if (re.test(newEnv)) {
        newEnv = newEnv.replace(re, `${k}=${v}`);
        console.log(`  Updated ${k}=${v}`);
      } else {
        newEnv += `\n${k}=${v}`;
        console.log(`  Added ${k}=${v}`);
      }
    }

    // Set new env via Monaco — click the editor and replace content
    console.log('→ Updating editor content...');
    // Click on the editor area
    const editor = await page.$('.monaco-editor');
    if (editor) {
      await editor.click();
      await sleep(300);
      // Select all + delete
      await page.keyboard.down('Control'); await page.keyboard.press('a'); await page.keyboard.up('Control');
      await sleep(200);
      await page.keyboard.press('Delete');
      await sleep(200);
      // Paste new content
      await page.keyboard.type(newEnv, { delay: 1 });
    } else {
      const ta = await page.$('textarea');
      if (ta) {
        await ta.click({ clickCount: 3 });
        await page.keyboard.down('Control'); await page.keyboard.press('a'); await page.keyboard.up('Control');
        await page.keyboard.press('Delete');
        await ta.type(newEnv, { delay: 1 });
      } else {
        throw new Error('Editor not found');
      }
    }

    // Click Save
    await sleep(800);
    const saved = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => /guardar|save/i.test((b.textContent || '').trim()));
      if (btn) { btn.click(); return btn.textContent.trim(); } return null;
    });
    console.log('  Saved:', saved);
    await sleep(3000);

    await page.screenshot({ path: 'C:\\Users\\GODSF\\AppData\\Local\\Temp\\env-saved.jpg', type: 'jpeg', quality: 80, fullPage: true });
    console.log('✓ Env updated.');
  } catch (err) {
    console.error('✗', err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
