<template>
  <div>
    <section class="tp-error-area pt-110 pb-110">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-8 col-md-10">
            <div class="tp-error-content text-center">
              <div class="tp-error-thumb">
                <img src="/img/error/error.png" alt="Página no encontrada" />
              </div>
              <h5 class="tp-error-title">Página no encontrada</h5>
              <p>La página que buscas no existe o fue movida. Vuelve al inicio y sigue explorando.</p>
              <nuxt-link href="/" class="tp-error-btn">Volver al inicio</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';
useSeo({ title: '404 — Página no encontrada' });
</script>
