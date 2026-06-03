<template>
  <footer class="hfoot">
    <div class="hfoot-main">
      <div class="container">
        <div class="row hfoot-row">

          <!-- Col 1: Brand -->
          <div class="col-xl-4 col-lg-4 col-md-6 col-12 hfoot-col">
            <div class="hfoot-brand">
              <hauled-logo size="lg" variant="light" class="hfoot-logo" />
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
                <a :href="waLink" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="hfoot-social-btn">
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
              <li><nuxt-link to="/encargos">Encargos</nuxt-link></li>
              <li><nuxt-link to="/wishlist">Lista de deseos</nuxt-link></li>
            </ul>
          </div>

          <!-- Col 3: Información -->
          <div class="col-xl-3 col-lg-3 col-md-6 col-6 hfoot-col">
            <h5 class="hfoot-heading">Información</h5>
            <ul class="hfoot-links">
              <li><nuxt-link to="/about">Sobre HAULED</nuxt-link></li>
              <li><a href="#">Política de envíos</a></li>
              <li><a href="#">Cambios y devoluciones</a></li>
              <li><nuxt-link to="/privacidad">Política de privacidad</nuxt-link></li>
              <li><nuxt-link to="/terminos">Términos y condiciones</nuxt-link></li>
            </ul>
          </div>

          <!-- Col 4: Contacto -->
          <div class="col-xl-3 col-lg-3 col-md-6 col-12 hfoot-col">
            <h5 class="hfoot-heading">Contacto</h5>
            <div class="hfoot-contact">
              <div class="hfoot-contact-line">
                <span class="hfoot-contact-label">WhatsApp</span>
                <a :href="waLink" target="_blank" rel="noopener noreferrer">+57 312 490 4720</a>
              </div>
              <div class="hfoot-contact-line">
                <span class="hfoot-contact-label">Email</span>
                <a href="mailto:info@hauled.shop">info@hauled.shop</a>
              </div>
              <div class="hfoot-contact-line">
                <span class="hfoot-contact-label">Ubicación</span>
                <span>Bucaramanga, Colombia · 100% virtual</span>
              </div>
              <div class="hfoot-contact-line">
                <span class="hfoot-contact-label">Horario</span>
                <span>24/7 · Siempre abierto</span>
              </div>
              <div class="hfoot-contact-line">
                <span class="hfoot-contact-label">Envíos</span>
                <span>Gratis en Bucaramanga</span>
              </div>
              <a
                :href="waLink"
                target="_blank"
                rel="noopener noreferrer"
                class="hfoot-wa-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chatea con nosotros
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
          <p class="hfoot-copy">© {{ currentYear }} HAULED · Bucaramanga, Colombia · Todos los derechos reservados</p>
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
const { link } = useWhatsApp();
const waLink = link('support');
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
.hfoot-logo { margin-bottom: 20px; }
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
  gap: 8px;
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
