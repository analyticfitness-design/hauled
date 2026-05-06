<template>
  <div>
    <hauled-page-header
      title="Privacidad"
      eyebrow="Ley 1581 de Colombia"
      subtitle="Política de Privacidad"
      bg="/img/hero/gasp-hero-2.jpg"
    />

    <section class="hlegal-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-12">
            <div class="hlegal-card">

              <div class="hlegal-meta">
                <span class="hlegal-badge">Habeas Data — Ley 1581/2012</span>
                <span class="hlegal-date">Última actualización: Mayo 2026</span>
              </div>

              <h1 class="hlegal-main-title">Política de Privacidad y Tratamiento de Datos Personales</h1>
              <p class="hlegal-company">HAULED SAS — Colombia</p>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">1. Responsable del Tratamiento</h2>
                <p>HAULED SAS, operador de <strong>hauled.shop</strong>, es responsable del tratamiento de los datos personales que usted nos proporciona.</p>
                <p>Correo de contacto: <a href="mailto:info@hauled.shop" class="hlegal-link">info@hauled.shop</a></p>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">2. Datos que Recolectamos</h2>
                <ul class="hlegal-list">
                  <li>Nombre completo</li>
                  <li>Correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección de entrega</li>
                  <li>Datos de navegación (cookies de sesión)</li>
                </ul>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">3. Finalidad del Tratamiento</h2>
                <p>Los datos recolectados se utilizan exclusivamente para:</p>
                <ul class="hlegal-list">
                  <li>Procesamiento y seguimiento de pedidos</li>
                  <li>Envío de notificaciones de estado del pedido</li>
                  <li>Soporte al cliente</li>
                  <li>Mejora de la experiencia de compra</li>
                  <li>Cumplimiento de obligaciones legales y comerciales</li>
                </ul>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">4. Con Quién Compartimos sus Datos</h2>
                <p>Solo compartimos datos con terceros estrictamente necesarios para operar el servicio:</p>
                <ul class="hlegal-list">
                  <li><strong>Wompi</strong> — procesador de pagos (Bancolombia)</li>
                  <li><strong>Empresas de mensajería / courier</strong> — para entrega del pedido</li>
                  <li><strong>WhatsApp Business API</strong> — notificaciones y atención al cliente</li>
                </ul>
                <p>No vendemos, arrendamos ni cedemos sus datos a terceros con fines comerciales.</p>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">5. Tiempo de Retención</h2>
                <p>Los datos personales se conservan por el tiempo que dure la relación comercial y un período adicional de <strong>5 años</strong> para cumplir con obligaciones legales y tributarias colombianas.</p>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">6. Derechos del Titular — Ley 1581/2012</h2>
                <p>Como titular de datos personales, usted tiene derecho a:</p>
                <ul class="hlegal-list">
                  <li><strong>Conocer</strong> los datos que tenemos sobre usted</li>
                  <li><strong>Actualizar</strong> la información cuando sea inexacta o incompleta</li>
                  <li><strong>Rectificar</strong> datos que no correspondan a la realidad</li>
                  <li><strong>Suprimir</strong> sus datos cuando no sean necesarios para las finalidades autorizadas</li>
                  <li><strong>Revocar</strong> la autorización de tratamiento</li>
                  <li><strong>Acceder</strong> gratuitamente a sus datos personales</li>
                </ul>
                <p>Para ejercer cualquiera de estos derechos, escríbanos a <a href="mailto:info@hauled.shop" class="hlegal-link">info@hauled.shop</a></p>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">7. Solicitud de Eliminación de Datos</h2>
                <p>Para solicitar la eliminación de sus datos personales de nuestros sistemas, puede:</p>
                <ul class="hlegal-list">
                  <li>Completar el formulario en <nuxt-link to="/datos" class="hlegal-link">/datos</nuxt-link></li>
                  <li>Escribirnos a <a href="mailto:info@hauled.shop" class="hlegal-link">info@hauled.shop</a></li>
                </ul>
                <p>Procesaremos su solicitud en un plazo máximo de 30 días hábiles conforme a la Ley 1581/2012.</p>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">8. Cookies</h2>
                <p>Utilizamos cookies de sesión para mantener el estado del carrito de compras y mejorar su experiencia de navegación. No utilizamos cookies de rastreo de terceros con fines publicitarios.</p>
              </div>

              <div class="hlegal-section-block">
                <h2 class="hlegal-heading">9. Contacto — Delegado de Protección de Datos (DPO)</h2>
                <p>Email: <a href="mailto:info@hauled.shop" class="hlegal-link">info@hauled.shop</a></p>
                <p>WhatsApp: <a :href="waLink" target="_blank" rel="noopener noreferrer" class="hlegal-link">+57 312 490 4720</a></p>
              </div>

              <div class="hlegal-footer-links">
                <nuxt-link to="/terminos" class="hlegal-footer-link">Términos y Condiciones</nuxt-link>
                <nuxt-link to="/datos" class="hlegal-footer-link">Solicitar eliminación de datos</nuxt-link>
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
  title: 'Política de Privacidad — HAULED',
  description: 'Política de privacidad y tratamiento de datos personales de HAULED SAS. Conforme a la Ley 1581 de Colombia (Habeas Data).',
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
