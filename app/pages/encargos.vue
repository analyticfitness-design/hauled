<template>
  <div>
    <nuxt-layout name="layout-one">
      <!-- ═══ HERO ═══════════════════════════════════════ -->
      <section class="enc-hero">
        <div class="enc-hero-bg"></div>
        <div class="enc-hero-overlay"></div>
        <div class="container enc-hero-inner">
          <span class="enc-eyebrow">✦ Encargos HAULED</span>
          <h1 class="enc-title">
            ¿No está tu talla?<br />
            <span class="enc-title-accent">Lo traemos de USA.</span>
          </h1>
          <p class="enc-sub">
            Pedidos a la medida desde Estados Unidos. GASP, Nike, Jordan, Supreme y cualquier marca que quieras.
            Tú eliges, nosotros lo traemos.
          </p>
          <div class="enc-hero-cta-wrap">
            <a href="#constructor" class="enc-cta-primary enc-cta-primary--accent">
              ⚡ Armar mi encargo ahora
            </a>
            <a href="#como-funciona" class="enc-cta-secondary">¿Cómo funciona? ↓</a>
          </div>
          <p class="enc-hero-meta">⚡ Respuesta en minutos · 🌎 Atención 24/7 · 🚚 Envío gratis en Bucaramanga</p>
        </div>
      </section>

      <!-- ═══ CONSTRUCTOR DE ENCARGO ═════════════════════ -->
      <section id="constructor" class="enc-builder-section">
        <div class="container">
          <div class="enc-section-head">
            <span class="enc-eyebrow">Constructor de encargo</span>
            <h2 class="enc-section-title">Arma tu encargo aquí</h2>
            <p class="enc-section-sub">
              Agrega los productos que quieres traer de USA. Te cotizamos en menos de 1 hora por WhatsApp.<br />
              <strong>Latencia estimada: 15–20 días hábiles</strong> desde la confirmación del pedido.
            </p>
          </div>

          <div class="enc-builder">
            <!-- Datos cliente -->
            <div class="enc-builder-card">
              <h3 class="enc-builder-card-title">Tus datos</h3>
              <div class="enc-builder-row">
                <div class="enc-field">
                  <label class="enc-label">Nombre</label>
                  <input v-model="customer.name" type="text" class="enc-input" placeholder="Tu nombre completo" />
                </div>
                <div class="enc-field">
                  <label class="enc-label">Ciudad</label>
                  <input v-model="customer.city" type="text" class="enc-input" placeholder="Bucaramanga, Bogotá, Medellín..." />
                </div>
              </div>
            </div>

            <!-- Items dinámicos -->
            <div class="enc-builder-card" v-for="(item, idx) in items" :key="idx">
              <div class="enc-item-head">
                <h3 class="enc-builder-card-title">
                  <span class="enc-item-num">{{ idx + 1 }}</span>
                  Producto #{{ idx + 1 }}
                </h3>
                <button
                  v-if="items.length > 1"
                  type="button"
                  class="enc-item-remove"
                  @click="removeItem(idx)"
                  aria-label="Eliminar producto"
                >✕</button>
              </div>

              <div class="enc-field">
                <label class="enc-label">Link del producto <span class="enc-label-hint">(o nombre/marca si no tienes link)</span></label>
                <input
                  v-model="item.link"
                  type="text"
                  class="enc-input"
                  placeholder="https://www.gaspofficial.com/... o 'GASP Skull T-back rojo'"
                />
              </div>

              <div class="enc-builder-row enc-builder-row-3">
                <div class="enc-field">
                  <label class="enc-label">Talla</label>
                  <input v-model="item.size" type="text" class="enc-input" placeholder="L, XL, US 10, 32..." />
                </div>
                <div class="enc-field">
                  <label class="enc-label">Color</label>
                  <input v-model="item.color" type="text" class="enc-input" placeholder="Negro, Blanco..." />
                </div>
                <div class="enc-field">
                  <label class="enc-label">Cantidad</label>
                  <input v-model.number="item.qty" type="number" min="1" class="enc-input" />
                </div>
              </div>

              <div class="enc-field">
                <label class="enc-label">Notas adicionales <span class="enc-label-hint">(opcional)</span></label>
                <textarea
                  v-model="item.notes"
                  class="enc-textarea"
                  rows="2"
                  placeholder="Edición especial, modelo del año X, alguna referencia importante..."
                ></textarea>
              </div>
            </div>

            <!-- Add item button -->
            <button type="button" class="enc-add-btn" @click="addItem">
              <span class="enc-add-icon">+</span> Agregar otro producto
            </button>

            <!-- Resumen -->
            <div class="enc-summary">
              <div class="enc-summary-stat">
                <span class="enc-summary-label">Productos</span>
                <span class="enc-summary-value">{{ items.length }}</span>
              </div>
              <div class="enc-summary-stat">
                <span class="enc-summary-label">Unidades totales</span>
                <span class="enc-summary-value">{{ totalUnits }}</span>
              </div>
              <div class="enc-summary-stat">
                <span class="enc-summary-label">Tiempo estimado</span>
                <span class="enc-summary-value">15–20 días</span>
              </div>
            </div>

            <!-- Submit -->
            <button
              type="button"
              class="enc-submit-btn"
              :disabled="!canSubmit"
              @click="submitOrder"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar encargo por WhatsApp
            </button>
            <p class="enc-submit-meta">
              Tu encargo se abrirá en WhatsApp con todos los detalles listos para enviar.
              Nosotros te respondemos con la cotización en pesos colombianos en menos de 1 hora.
            </p>
          </div>
        </div>
      </section>

      <!-- ═══ CÓMO FUNCIONA ══════════════════════════════ -->
      <section id="como-funciona" class="enc-steps-section">
        <div class="container">
          <div class="enc-section-head">
            <span class="enc-eyebrow">El proceso</span>
            <h2 class="enc-section-title">Así funciona un encargo</h2>
            <p class="enc-section-sub">Cuatro pasos simples. Sin sorpresas, sin enredos.</p>
          </div>

          <div class="enc-steps-grid">
            <div class="enc-step" v-for="(s, i) in steps" :key="i">
              <span class="enc-step-num">0{{ i + 1 }}</span>
              <h3 class="enc-step-title">{{ s.title }}</h3>
              <p class="enc-step-text">{{ s.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ QUÉ PUEDES ENCARGAR ════════════════════════ -->
      <section class="enc-categories-section">
        <div class="container">
          <div class="enc-section-head">
            <span class="enc-eyebrow">Qué traemos</span>
            <h2 class="enc-section-title">Lo que puedes encargar</h2>
            <p class="enc-section-sub">Si está en USA, lo conseguimos.</p>
          </div>

          <div class="enc-cats-grid">
            <div class="enc-cat" v-for="(c, i) in categories" :key="i">
              <div class="enc-cat-icon">{{ c.icon }}</div>
              <h3 class="enc-cat-title">{{ c.title }}</h3>
              <p class="enc-cat-text">{{ c.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ TIEMPOS Y PRECIOS ══════════════════════════ -->
      <section class="enc-info-section">
        <div class="container">
          <div class="enc-info-grid">
            <div class="enc-info-card">
              <span class="enc-info-icon">🕒</span>
              <h3 class="enc-info-title">Tiempo de entrega</h3>
              <p class="enc-info-value">10–25 días hábiles</p>
              <p class="enc-info-desc">Depende del producto y el outlet de origen. Te confirmamos antes de pagar.</p>
            </div>
            <div class="enc-info-card">
              <span class="enc-info-icon">💳</span>
              <h3 class="enc-info-title">Forma de pago</h3>
              <p class="enc-info-value">50% adelanto · 50% al recibir</p>
              <p class="enc-info-desc">Pagas la mitad para iniciar el encargo y el resto cuando llega a tus manos.</p>
            </div>
            <div class="enc-info-card">
              <span class="enc-info-icon">🚚</span>
              <h3 class="enc-info-title">Envío en Colombia</h3>
              <p class="enc-info-value">Gratis en Bucaramanga</p>
              <p class="enc-info-desc">Resto del país: $22.000. Gratis en pedidos de más de $300.000.</p>
            </div>
            <div class="enc-info-card">
              <span class="enc-info-icon">✓</span>
              <h3 class="enc-info-title">Garantía</h3>
              <p class="enc-info-value">100% original o te devolvemos</p>
              <p class="enc-info-desc">Cada pieza viene con su recibo y empaque original del outlet americano.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ FAQ ════════════════════════════════════════ -->
      <section class="enc-faq-section">
        <div class="container">
          <div class="enc-section-head">
            <span class="enc-eyebrow">Preguntas frecuentes</span>
            <h2 class="enc-section-title">Lo que casi siempre nos preguntan</h2>
          </div>

          <div class="enc-faq-list">
            <details class="enc-faq" v-for="(f, i) in faqs" :key="i" :open="i === 0">
              <summary class="enc-faq-q">
                {{ f.q }}
                <span class="enc-faq-icon">+</span>
              </summary>
              <p class="enc-faq-a">{{ f.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- ═══ CTA FINAL ══════════════════════════════════ -->
      <section class="enc-cta-section">
        <div class="container">
          <div class="enc-cta-card">
            <h2 class="enc-cta-title">¿Listo para tu primer encargo?</h2>
            <p class="enc-cta-text">
              Mándanos el link, foto o referencia del producto que quieres.
              Te cotizamos en menos de 1 hora — sin compromiso.
            </p>
            <a :href="waLink" target="_blank" class="enc-cta-primary enc-cta-primary--big">
              💬 Hablar con HAULED por WhatsApp
            </a>
            <p class="enc-cta-meta">o escríbenos a <a href="mailto:info@hauled.shop">info@hauled.shop</a></p>
          </div>
        </div>
      </section>
    </nuxt-layout>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';

definePageMeta({ layout: false });

useSeo({
  title: 'Encargos USA — HAULED',
  description: 'Pedidos a la medida desde Estados Unidos. GASP, Nike, Jordan, Supreme y más. Cotización en menos de 1 hora. Envío gratis en Bucaramanga.',
});

const config = useRuntimeConfig();
const waNumber = config.public.whatsappNumber as string;
const waMsg = encodeURIComponent('Hola HAULED 👋 quiero hacer un encargo desde USA');
const waLink = `https://wa.me/${waNumber}?text=${waMsg}`;

// ═══ Constructor de encargo (form interactivo) ═══
type OrderItem = {
  link: string;
  size: string;
  color: string;
  qty: number;
  notes: string;
};

const customer = reactive({ name: '', city: '' });
const items = reactive<OrderItem[]>([
  { link: '', size: '', color: '', qty: 1, notes: '' },
]);

const addItem = () => {
  items.push({ link: '', size: '', color: '', qty: 1, notes: '' });
  // Scroll suave al nuevo item
  nextTick(() => {
    const cards = document.querySelectorAll('.enc-builder-card');
    cards[cards.length - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
};

const removeItem = (idx: number) => {
  if (items.length > 1) items.splice(idx, 1);
};

const totalUnits = computed(() =>
  items.reduce((sum, it) => sum + (Number(it.qty) || 0), 0)
);

const canSubmit = computed(() =>
  customer.name.trim().length > 0 &&
  items.some(it => it.link.trim().length > 0)
);

const submitOrder = () => {
  if (!canSubmit.value) return;

  let msg = '🛒 *NUEVO ENCARGO HAULED*\n\n';
  msg += `👤 *Cliente:* ${customer.name}\n`;
  if (customer.city) msg += `📍 *Ciudad:* ${customer.city}\n`;
  msg += `\n📦 *Productos (${items.length}):*\n`;
  msg += '─────────────────\n';

  items.forEach((it, i) => {
    if (!it.link.trim()) return;
    msg += `\n*${i + 1}.* ${it.link}\n`;
    if (it.size) msg += `   • Talla: ${it.size}\n`;
    if (it.color) msg += `   • Color: ${it.color}\n`;
    msg += `   • Cantidad: ${it.qty || 1}\n`;
    if (it.notes) msg += `   • Notas: ${it.notes}\n`;
  });

  msg += '\n─────────────────\n';
  msg += `⏱ *Latencia esperada:* 15–20 días hábiles\n`;
  msg += `💬 Quedo atento a la cotización en COP. ¡Gracias!`;

  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
};

const steps = [
  {
    title: 'Mándanos el link o referencia',
    text: 'Por WhatsApp, con el link del producto, una foto, o solo el nombre. Talla, color y modelo exacto.',
  },
  {
    title: 'Cotización en menos de 1 hora',
    text: 'Te confirmamos disponibilidad, precio final en pesos colombianos y tiempo de entrega.',
  },
  {
    title: 'Pagas el 50% para iniciar',
    text: 'Vía Nequi, Daviplata, Wompi o transferencia. Hacemos el pedido al outlet ese mismo día.',
  },
  {
    title: 'Lo recibes en Colombia',
    text: 'Te avisamos cuando llega y te lo entregamos en Bucaramanga gratis o por envío nacional.',
  },
];

const categories = [
  {
    icon: '👕',
    title: 'Ropa GASP & Gym',
    text: 'Tanks, t-backs, baggy pants, hoodies. Colección completa hardcore directo del outlet GASP.',
  },
  {
    icon: '👟',
    title: 'Sneakers & SNKRS',
    text: 'Nike, Jordan, New Balance, Yeezy. Drops exclusivos de la app SNKRS y outlets oficiales.',
  },
  {
    icon: '🧢',
    title: 'Streetwear premium',
    text: 'Supreme, Stüssy, Carhartt, Champion. Drops exclusivos y restock del momento.',
  },
  {
    icon: '🏋️',
    title: 'Suplementos & Gear',
    text: 'Cinturones, straps, knee sleeves, mochilas tácticas. Equipo serio para el gym.',
  },
  {
    icon: '🎒',
    title: 'Accesorios USA',
    text: 'Mochilas, gorras, billeteras, gym bags. Marcas americanas auténticas con factura.',
  },
  {
    icon: '✨',
    title: 'Lo que se te ocurra',
    text: '¿No ves tu marca? Mándanos el link igual. Si está en USA, lo conseguimos.',
  },
];

const faqs = [
  {
    q: '¿Cómo sé que el producto es original?',
    a: 'Cada encargo viene con factura del outlet o tienda oficial americana. Te mostramos foto del recibo antes de enviar. Si llega no original, te devolvemos el 100% del dinero.',
  },
  {
    q: '¿Cuánto cobran por el servicio?',
    a: 'No cobramos comisión aparte. El precio que te cotizamos en pesos colombianos ya incluye el producto, importación, flete y nuestro margen. Sin sorpresas.',
  },
  {
    q: '¿Qué pasa si el producto no llega o llega dañado?',
    a: 'Te devolvemos el 100% del adelanto. Asumimos nosotros el riesgo del transporte internacional. Tú solo pagas por algo que llegue bien.',
  },
  {
    q: '¿Puedo encargar varias cosas a la vez?',
    a: 'Sí, mientras más mejor. Te ahorras flete consolidando varios productos en un mismo encargo. Pedidos de más de $300.000 tienen envío nacional gratis.',
  },
  {
    q: '¿Atienden 24/7?',
    a: 'Sí, somos 100% virtuales. Respondemos por WhatsApp a cualquier hora del día, todos los días. Cotizaciones en menos de 1 hora siempre.',
  },
  {
    q: '¿Cuánto se demora el envío desde USA?',
    a: 'Entre 10 y 25 días hábiles desde que confirmas el pedido hasta que lo entregamos en tu casa en Colombia. El tiempo exacto te lo confirmamos al cotizar.',
  },
];
</script>

<style scoped>
/* ═══ HERO ════════════════════════════════════════════ */
.enc-hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: clamp(80px, 12vw, 140px) 0 clamp(60px, 8vw, 100px);
}
.enc-hero-bg {
  position: absolute;
  inset: 0;
  background: url('/img/hero/hero-athlete.jpg') center/cover no-repeat;
  filter: grayscale(0.3) contrast(1.1);
  z-index: 0;
}
.enc-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(13,34,51,0.85) 50%, rgba(0,0,0,0.7) 100%);
  z-index: 1;
}
.enc-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 800px;
}
.enc-eyebrow {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.72rem;
  letter-spacing: 6px;
  color: #4CC9F0;
  text-transform: uppercase;
  margin-bottom: 18px;
}
.enc-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  line-height: 0.95;
  letter-spacing: -1px;
  text-transform: uppercase;
  color: #fff;
  margin: 0 0 24px;
}
.enc-title-accent {
  color: #4CC9F0;
}
.enc-sub {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 1.6vw, 1.18rem);
  font-weight: 300;
  line-height: 1.55;
  color: rgba(255,255,255,0.78);
  margin: 0 0 36px;
  max-width: 600px;
}
.enc-hero-cta-wrap {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.enc-cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #25d366;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 18px 32px;
  border-radius: 6px;
  transition: all 220ms ease;
  box-shadow: 0 8px 24px rgba(37,211,102,0.3);
}
.enc-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(37,211,102,0.45);
  background: #1ebe5d;
}
.enc-cta-primary--big {
  padding: 22px 44px;
  font-size: 1.05rem;
}
.enc-cta-secondary {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.92rem;
  color: #fff;
  text-decoration: none;
  padding: 18px 24px;
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 6px;
  transition: all 220ms ease;
}
.enc-cta-secondary:hover {
  background: rgba(255,255,255,0.06);
  border-color: #4CC9F0;
  color: #4CC9F0;
}
.enc-hero-meta {
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.5);
  margin: 0;
}

/* ═══ SECTION HEAD ════════════════════════════════════ */
.enc-section-head {
  text-align: center;
  margin-bottom: clamp(40px, 6vw, 64px);
}
.enc-section-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  letter-spacing: -0.5px;
  text-transform: uppercase;
  color: #111;
  margin: 8px 0 14px;
}
.enc-section-sub {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(0,0,0,0.55);
  margin: 0;
}

/* ═══ STEPS ═══════════════════════════════════════════ */
.enc-steps-section {
  background: #fff;
  padding: clamp(80px, 10vw, 120px) 0;
}
.enc-steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  counter-reset: steps;
}
@media (max-width: 991px) { .enc-steps-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 575px) { .enc-steps-grid { grid-template-columns: 1fr; } }

.enc-step {
  position: relative;
  padding: 36px 28px 32px;
  background: #F4F4F4;
  border-radius: 10px;
  border-top: 3px solid #4CC9F0;
  transition: transform 280ms ease, box-shadow 280ms ease;
}
.enc-step:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.08);
}
.enc-step-num {
  display: block;
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 2.4rem;
  line-height: 1;
  color: #4CC9F0;
  margin-bottom: 14px;
}
.enc-step-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: #111;
  margin: 0 0 10px;
  line-height: 1.3;
}
.enc-step-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  color: rgba(0,0,0,0.65);
  line-height: 1.55;
  margin: 0;
}

/* ═══ CATEGORIES ══════════════════════════════════════ */
.enc-categories-section {
  background: #0d2233;
  padding: clamp(80px, 10vw, 120px) 0;
}
.enc-categories-section .enc-section-title { color: #fff; }
.enc-categories-section .enc-section-sub { color: rgba(255,255,255,0.55); }

.enc-cats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 991px) { .enc-cats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 575px) { .enc-cats-grid { grid-template-columns: 1fr; } }

.enc-cat {
  padding: 36px 28px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  transition: all 320ms ease;
}
.enc-cat:hover {
  background: rgba(76,201,240,0.06);
  border-color: rgba(76,201,240,0.3);
  transform: translateY(-3px);
}
.enc-cat-icon {
  font-size: 2.2rem;
  margin-bottom: 14px;
}
.enc-cat-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #fff;
  margin: 0 0 8px;
}
.enc-cat-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.86rem;
  font-weight: 300;
  color: rgba(255,255,255,0.62);
  line-height: 1.55;
  margin: 0;
}

/* ═══ INFO CARDS ══════════════════════════════════════ */
.enc-info-section {
  background: #F4F4F4;
  padding: clamp(70px, 9vw, 100px) 0;
}
.enc-info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
@media (max-width: 991px) { .enc-info-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 575px) { .enc-info-grid { grid-template-columns: 1fr; } }

.enc-info-card {
  background: #fff;
  padding: 32px 24px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
.enc-info-icon {
  display: block;
  font-size: 2rem;
  margin-bottom: 12px;
}
.enc-info-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(0,0,0,0.5);
  margin: 0 0 8px;
}
.enc-info-value {
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-size: 1.12rem;
  color: #111;
  margin: 0 0 10px;
  line-height: 1.25;
}
.enc-info-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(0,0,0,0.55);
  line-height: 1.5;
  margin: 0;
}

/* ═══ FAQ ═════════════════════════════════════════════ */
.enc-faq-section {
  background: #fff;
  padding: clamp(80px, 10vw, 120px) 0;
}
.enc-faq-list {
  max-width: 760px;
  margin: 0 auto;
}
.enc-faq {
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding: 6px 0;
}
.enc-faq-q {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #111;
  cursor: pointer;
  padding: 22px 0;
  transition: color 200ms ease;
}
.enc-faq-q::-webkit-details-marker { display: none; }
.enc-faq-q:hover { color: #4CC9F0; }
.enc-faq-icon {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 1.6rem;
  color: #4CC9F0;
  transition: transform 220ms ease;
}
.enc-faq[open] .enc-faq-icon { transform: rotate(45deg); }
.enc-faq-a {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.65;
  color: rgba(0,0,0,0.65);
  margin: 0 0 22px;
  padding-right: 30px;
}

/* ═══ CTA FINAL ═══════════════════════════════════════ */
.enc-cta-section {
  background: #111;
  padding: clamp(80px, 10vw, 120px) 0;
}
.enc-cta-card {
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}
.enc-cta-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.5px;
  text-transform: uppercase;
  color: #fff;
  margin: 0 0 18px;
  line-height: 1;
}
.enc-cta-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 300;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
  margin: 0 0 36px;
}
.enc-cta-meta {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  margin: 22px 0 0;
}
.enc-cta-meta a {
  color: #4CC9F0;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.enc-cta-primary--accent {
  background: #4CC9F0;
  color: #111;
  box-shadow: 0 8px 24px rgba(76,201,240,0.35);
}
.enc-cta-primary--accent:hover {
  background: #3bb8df;
  box-shadow: 0 12px 32px rgba(76,201,240,0.5);
}

/* ═══ BUILDER ═════════════════════════════════════════ */
.enc-builder-section {
  background: linear-gradient(180deg, #fff 0%, #F4F4F4 100%);
  padding: clamp(80px, 10vw, 120px) 0;
}
.enc-builder {
  max-width: 760px;
  margin: 0 auto;
}
.enc-builder-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px 28px;
  margin-bottom: 18px;
  box-shadow: 0 6px 28px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.05);
  border-top: 3px solid #4CC9F0;
  animation: encSlideIn 320ms ease;
}
@keyframes encSlideIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.enc-builder-card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #111;
  margin: 0 0 22px;
}
.enc-item-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #4CC9F0;
  color: #111;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 900;
}
.enc-item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.enc-item-head .enc-builder-card-title { margin-bottom: 22px; }
.enc-item-remove {
  background: rgba(0,0,0,0.05);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 0.85rem;
  color: rgba(0,0,0,0.5);
  cursor: pointer;
  transition: all 200ms ease;
}
.enc-item-remove:hover {
  background: #ff3b30;
  color: #fff;
  transform: rotate(90deg);
}

.enc-builder-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.enc-builder-row-3 {
  grid-template-columns: 1fr 1fr 100px;
}
@media (max-width: 575px) {
  .enc-builder-row,
  .enc-builder-row-3 { grid-template-columns: 1fr; }
}

.enc-field { margin-bottom: 16px; }
.enc-field:last-child { margin-bottom: 0; }
.enc-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(0,0,0,0.55);
  margin-bottom: 6px;
}
.enc-label-hint {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  color: rgba(0,0,0,0.38);
  margin-left: 6px;
}
.enc-input,
.enc-textarea {
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 0.92rem;
  color: #111;
  background: #F4F4F4;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 12px 14px;
  transition: all 220ms ease;
}
.enc-input:focus,
.enc-textarea:focus {
  background: #fff;
  border-color: #4CC9F0;
  outline: none;
  box-shadow: 0 0 0 3px rgba(76,201,240,0.15);
}
.enc-textarea { resize: vertical; min-height: 60px; }

.enc-add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  background: transparent;
  border: 2px dashed rgba(76,201,240,0.4);
  color: #4CC9F0;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.92rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 22px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 240ms ease;
  margin-bottom: 24px;
}
.enc-add-btn:hover {
  background: rgba(76,201,240,0.05);
  border-color: #4CC9F0;
  transform: translateY(-2px);
}
.enc-add-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #4CC9F0;
  color: #111;
  border-radius: 50%;
  font-weight: 900;
  font-size: 1rem;
  line-height: 1;
}

.enc-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  background: #0d2233;
  border-radius: 10px;
  padding: 22px 24px;
  margin-bottom: 18px;
}
@media (max-width: 575px) { .enc-summary { grid-template-columns: 1fr; } }

.enc-summary-stat {
  text-align: center;
}
.enc-summary-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.66rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 4px;
}
.enc-summary-value {
  display: block;
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.4rem;
  color: #4CC9F0;
}

.enc-submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  background: #25d366;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 22px 32px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 260ms ease;
  box-shadow: 0 10px 30px rgba(37,211,102,0.32);
}
.enc-submit-btn:hover:not(:disabled) {
  background: #1ebe5d;
  transform: translateY(-2px);
  box-shadow: 0 14px 38px rgba(37,211,102,0.45);
}
.enc-submit-btn:disabled {
  background: rgba(0,0,0,0.12);
  color: rgba(0,0,0,0.4);
  box-shadow: none;
  cursor: not-allowed;
}
.enc-submit-meta {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 300;
  color: rgba(0,0,0,0.5);
  text-align: center;
  margin: 14px 0 0;
  line-height: 1.55;
}
</style>
