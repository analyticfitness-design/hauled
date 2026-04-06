<template>
  <footer class="hfoot">
    <div class="hfoot-main">
      <div class="container">
        <div class="row hfoot-row">

          <!-- Col 1: Brand -->
          <div class="col-xl-4 col-lg-4 col-md-6 col-12 hfoot-col">
            <div class="hfoot-brand">
              <nuxt-link to="/" class="hfoot-logo">
                <span class="hfoot-logo-word">HAULED</span>
                <span class="hfoot-logo-sub">Direct from the States</span>
              </nuxt-link>
              <p class="hfoot-desc">
                Ropa original de USA traída directamente a Colombia. Nike, Jordan, Gap, GASP y más — autenticidad garantizada, envío nacional.
              </p>
              <div class="hfoot-social">
                <a href="https://instagram.com/hauled.co" target="_blank" aria-label="Instagram" class="hfoot-social-btn">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="https://wa.me/573000000000" target="_blank" aria-label="WhatsApp" class="hfoot-social-btn">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@hauled.co" target="_blank" aria-label="TikTok" class="hfoot-social-btn">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Col 2: Tienda -->
          <div class="col-xl-2 col-lg-2 col-md-6 col-6 hfoot-col">
            <h5 class="hfoot-heading">Tienda</h5>
            <ul class="hfoot-links">
              <li><nuxt-link to="/shop">Catálogo completo</nuxt-link></li>
              <li><nuxt-link to="/shop?hauledLine=originals">Originals USA</nuxt-link></li>
              <li><nuxt-link to="/shop?hauledLine=basics">Basics HAULED</nuxt-link></li>
              <li><nuxt-link to="/shop?hauledLine=encargo">Encargos</nuxt-link></li>
              <li><nuxt-link to="/wishlist">Lista de deseos</nuxt-link></li>
            </ul>
          </div>

          <!-- Col 3: Información -->
          <div class="col-xl-3 col-lg-3 col-md-6 col-6 hfoot-col">
            <h5 class="hfoot-heading">Información</h5>
            <ul class="hfoot-links">
              <li><a href="#">Sobre HAULED</a></li>
              <li><a href="#">Política de envíos</a></li>
              <li><a href="#">Cambios y devoluciones</a></li>
              <li><a href="#">Política de privacidad</a></li>
              <li><a href="#">Términos y condiciones</a></li>
            </ul>
          </div>

          <!-- Col 4: Contacto -->
          <div class="col-xl-3 col-lg-3 col-md-6 col-12 hfoot-col">
            <h5 class="hfoot-heading">Contacto</h5>
            <div class="hfoot-contact">
              <div class="hfoot-contact-line">
                <span class="hfoot-contact-label">WhatsApp</span>
                <a href="https://wa.me/573000000000" target="_blank">+57 300 000 0000</a>
              </div>
              <div class="hfoot-contact-line">
                <span class="hfoot-contact-label">Email</span>
                <a href="mailto:hola@hauled.shop">hola@hauled.shop</a>
              </div>
              <div class="hfoot-contact-line">
                <span class="hfoot-contact-label">Ubicación</span>
                <span>Bogotá, Colombia</span>
              </div>
              <a
                href="https://wa.me/573000000000?text=Hola%20HAULED%2C%20tengo%20una%20pregunta%20%F0%9F%91%8B"
                target="_blank"
                class="hfoot-wa-btn"
              >
                Escribirnos por WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="hfoot-bottom">
      <div class="container">
        <div class="hfoot-bottom-inner">
          <p class="hfoot-copy">© {{ currentYear }} HAULED · Bogotá, Colombia · Todos los derechos reservados</p>
          <div class="hfoot-payments">
            <span class="hfoot-payment-badge">Nequi</span>
            <span class="hfoot-payment-badge">Daviplata</span>
            <span class="hfoot-payment-badge">Wompi</span>
            <span class="hfoot-payment-badge">Visa</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{ primary_style?: boolean; style_2?: boolean; style_3?: boolean; }>();
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.hfoot {
  background: var(--h-black, #111);
  color: #fff;
}
.hfoot-main {
  padding: clamp(52px, 7vw, 96px) 0 clamp(40px, 5vw, 64px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.hfoot-row { row-gap: 40px; }

/* ── Brand ────────────────────────────────────────── */
.hfoot-logo {
  display: inline-flex;
  flex-direction: column;
  text-decoration: none;
  margin-bottom: 20px;
  gap: 3px;
}
.hfoot-logo-word {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.85rem;
  letter-spacing: var(--h-ls-logo, 10px);
  color: #fff;
  text-transform: uppercase;
}
.hfoot-logo-sub {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.46rem;
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
}
.hfoot-desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.82rem);
  line-height: 1.75;
  color: rgba(255,255,255,0.4);
  margin-bottom: 24px;
  max-width: 300px;
}
.hfoot-social { display: flex; gap: 10px; }
.hfoot-social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: border-color var(--h-dur-fast, 180ms), color var(--h-dur-fast, 180ms);
}
.hfoot-social-btn:hover { border-color: var(--h-blue, #4CC9F0); color: var(--h-blue, #4CC9F0); }

/* ── Headings ─────────────────────────────────────── */
.hfoot-heading {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: var(--h-fs-label, 0.72rem);
  letter-spacing: var(--h-ls-label, 4px);
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 20px;
}

/* ── Links ────────────────────────────────────────── */
.hfoot-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hfoot-links a {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.85rem);
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  padding: 4px 0;
  display: block;
  transition: color var(--h-dur-fast, 180ms);
}
.hfoot-links a:hover { color: var(--h-blue, #4CC9F0); }

/* ── Contact ──────────────────────────────────────── */
.hfoot-contact { display: flex; flex-direction: column; gap: 14px; }
.hfoot-contact-line { display: flex; flex-direction: column; gap: 2px; }
.hfoot-contact-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
}
.hfoot-contact-line a,
.hfoot-contact-line span:last-child {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.85rem);
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  transition: color var(--h-dur-fast, 180ms);
}
.hfoot-contact-line a:hover { color: var(--h-blue, #4CC9F0); }
.hfoot-wa-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #25D366;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: var(--h-fs-small, 0.82rem);
  padding: 12px 20px;
  border-radius: 6px;
  text-decoration: none;
  min-height: 44px;
  transition: background var(--h-dur-fast, 180ms);
  margin-top: 4px;
}
.hfoot-wa-btn:hover { background: #1aab52; }

/* ── Bottom bar ───────────────────────────────────── */
.hfoot-bottom { padding: 20px 0; }
.hfoot-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.hfoot-copy {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  color: rgba(255,255,255,0.22);
  margin: 0;
}
.hfoot-payments { display: flex; gap: 8px; flex-wrap: wrap; }
.hfoot-payment-badge {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.22);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 3px 8px;
  border-radius: 3px;
}

/* ── Mobile ───────────────────────────────────────── */
@media (max-width: 575px) {
  .hfoot-bottom-inner { flex-direction: column; align-items: flex-start; }
  .hfoot-desc { max-width: 100%; }
}
</style>
