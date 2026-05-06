<template>
  <div>
    <hauled-page-header
      title="Términos"
      eyebrow="Condiciones de uso"
      subtitle="Términos y Condiciones"
      bg="/img/hero/gasp-hero-2.jpg"
    />

    <section class="hlegal-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-12">
            <div class="hlegal-card">

              <div class="hlegal-meta">
                <span class="hlegal-badge">Vigente desde Mayo 2026</span>
                <span class="hlegal-date">Última actualización: Mayo 2026</span>
              </div>

              <h1 class="hlegal-main-title">Términos y Condiciones</h1>
              <p class="hlegal-company">HAULED SAS — Colombia · hauled.shop</p>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">1. Objeto</h2>
                <p>HAULED SAS ofrece ropa y accesorios de moda a través de <strong>hauled.shop</strong>. Estos términos rigen el uso del sitio web y la realización de compras. Al navegar o comprar en hauled.shop, usted acepta estos términos en su totalidad.</p>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">2. Proceso de Compra</h2>
                <ul class="hlegal-list">
                  <li>Los precios están expresados en pesos colombianos (COP) e incluyen IVA cuando corresponda.</li>
                  <li>Los pedidos se procesan después de la confirmación del pago a través de Wompi.</li>
                  <li>HAULED se reserva el derecho de cancelar pedidos en caso de error de precio o disponibilidad de inventario.</li>
                  <li>Recibirá una confirmación por correo electrónico una vez el pago sea procesado.</li>
                </ul>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">3. Envíos</h2>
                <ul class="hlegal-list">
                  <li>Enviamos a todo el territorio colombiano.</li>
                  <li>Tiempo estimado de entrega: <strong>2–5 días hábiles</strong> tras confirmación del pago.</li>
                  <li>El costo de envío varía según la ciudad de destino y se informa en el checkout.</li>
                  <li>Envío gratis en Bucaramanga y en pedidos nacionales superiores a $300.000 COP.</li>
                  <li>Los tiempos de entrega son estimados y pueden variar por causas ajenas a HAULED (fuerza mayor, congestión logística).</li>
                </ul>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">4. Devoluciones y Cambios</h2>
                <ul class="hlegal-list">
                  <li>Aceptamos cambios por <strong>talla equivocada o defecto de fábrica</strong> dentro de los <strong>5 días hábiles</strong> siguientes a la recepción del pedido.</li>
                  <li>El producto debe estar sin uso, con etiquetas originales y en su empaque original.</li>
                  <li>Para iniciar un proceso de cambio, contacte a <a href="mailto:info@hauled.shop" class="hlegal-link">info@hauled.shop</a>.</li>
                  <li>No se aceptan devoluciones de productos de la línea de encargos internacionales salvo defecto comprobable.</li>
                </ul>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">5. Pagos</h2>
                <ul class="hlegal-list">
                  <li>Procesamos pagos con <strong>Wompi</strong> (plataforma de pagos de Bancolombia).</li>
                  <li>Aceptamos tarjetas de crédito/débito, PSE, Nequi y Daviplata.</li>
                  <li>HAULED <strong>no almacena datos de tarjetas</strong> bancarias. Toda transacción se procesa directamente en los servidores seguros de Wompi.</li>
                  <li>En caso de pago rechazado, el pedido no será procesado y deberá iniciar una nueva transacción.</li>
                </ul>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">6. Encargos Especiales</h2>
                <ul class="hlegal-list">
                  <li>Los encargos de productos desde Estados Unidos requieren un <strong>anticipo del 50%</strong> del valor cotizado.</li>
                  <li>El tiempo de entrega varía entre 10 y 25 días hábiles según el proveedor y destino de origen.</li>
                  <li>HAULED confirmará disponibilidad y precio antes de recibir el anticipo.</li>
                  <li>En caso de que el producto no esté disponible, se reembolsará el 100% del anticipo.</li>
                  <li>Los encargos no admiten cambios de talla o modelo una vez iniciado el proceso de compra en USA.</li>
                </ul>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">7. Disponibilidad del Servicio</h2>
                <p>HAULED realiza esfuerzos razonables para mantener hauled.shop disponible las 24 horas. Sin embargo, puede haber interrupciones por mantenimiento, actualizaciones o fallas técnicas. No nos responsabilizamos por perjuicios derivados de la inaccesibilidad temporal del sitio.</p>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">8. Propiedad Intelectual</h2>
                <p>Todo el contenido de hauled.shop — incluyendo textos, imágenes, logotipos, diseño y código — es propiedad de HAULED SAS o de sus licenciantes y está protegido por las leyes de propiedad intelectual colombianas. Queda prohibida su reproducción o uso sin autorización escrita.</p>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">9. Ley Aplicable y Jurisdicción</h2>
                <p>Estos términos se rigen por la legislación de la República de Colombia. Cualquier disputa será resuelta ante los tribunales competentes de Bucaramanga, Santander.</p>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">10. Contacto</h2>
                <p>Email: <a href="mailto:info@hauled.shop" class="hlegal-link">info@hauled.shop</a></p>
                <p>WhatsApp: <a :href="waLink" target="_blank" rel="noopener noreferrer" class="hlegal-link">+57 312 490 4720</a></p>
                <p>Bucaramanga, Santander, Colombia</p>
              </div>

              <div class="hlegal-footer-links">
                <nuxt-link to="/privacidad" class="hlegal-footer-link">Política de Privacidad</nuxt-link>
                <nuxt-link to="/datos" class="hlegal-footer-link">Eliminar mis datos</nuxt-link>
                <nuxt-link to="/contact" class="hlegal-footer-link">Contacto</nuxt-link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';

definePageMeta({ layout: 'default' });

useSeo({
  title: 'Términos y Condiciones — HAULED',
  description: 'Términos y condiciones de uso de hauled.shop. Proceso de compra, envíos, devoluciones, pagos y encargos especiales desde USA.',
});

const { link } = useWhatsApp();
const waLink = link('support');
</script>

<style scoped>
.hlegal-section {
  background: var(--h-grey, #F4F4F4);
  padding: clamp(48px, 7vw, 96px) 0;
}

.hlegal-card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: clamp(28px, 5vw, 56px);
  box-shadow: var(--h-shadow-card, 0 4px 20px rgba(0,0,0,0.08));
}

.hlegal-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.hlegal-badge {
  display: inline-block;
  background: rgba(76, 201, 240, 0.12);
  color: #1a7fa8;
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 4px;
}

.hlegal-date {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: rgba(0, 0, 0, 0.4);
}

.hlegal-main-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: clamp(1.4rem, 3.5vw, 2rem);
  letter-spacing: -0.5px;
  text-transform: uppercase;
  color: var(--h-black, #111);
  margin: 0 0 6px;
  line-height: 1.15;
}

.hlegal-company {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.4);
  margin: 0 0 36px;
}

.hlegal-section-block {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}
.hlegal-section-block:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.hlegal-heading {
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--h-black, #111);
  margin: 0 0 14px;
}

.hlegal-section-block p {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.65);
  margin: 0 0 10px;
}
.hlegal-section-block p:last-child { margin-bottom: 0; }

.hlegal-list {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.65);
  padding-left: 20px;
  margin: 0 0 10px;
}
.hlegal-list li { margin-bottom: 6px; }

.hlegal-link {
  color: var(--h-blue, #4CC9F0);
  text-decoration: none;
  border-bottom: 1px solid rgba(76, 201, 240, 0.4);
  transition: border-color var(--h-dur-fast, 180ms);
}
.hlegal-link:hover { border-color: var(--h-blue, #4CC9F0); }

.hlegal-footer-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 28px;
  margin-top: 28px;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
}

.hlegal-footer-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
  transition: color var(--h-dur-fast, 180ms);
}
.hlegal-footer-link:hover { color: var(--h-blue, #4CC9F0); }
</style>
