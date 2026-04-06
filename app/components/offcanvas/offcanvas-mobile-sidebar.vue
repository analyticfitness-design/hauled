<template>
  <div
    :class="`offcanvas__area offcanvas__radius ${
      utilsStore.openMobileMenus ? 'offcanvas-opened' : ''
    }`"
  >
    <div class="offcanvas__wrapper">
      <div class="offcanvas__close">
        <button
          @click="utilsStore.handleOpenMobileMenu()"
          class="offcanvas__close-btn offcanvas-close-btn"
        >
          <svg-close-2 />
        </button>
      </div>
      <div class="offcanvas__content">
        <div
          class="offcanvas__top mb-70 d-flex justify-content-between align-items-center"
        >
          <div class="offcanvas__logo logo">
            <nuxt-link href="/" class="hoff-logo">
              <span class="hoff-logo-word">HAULED</span>
              <span class="hoff-logo-sub">Direct from the States</span>
            </nuxt-link>
          </div>
        </div>
        <!-- mobile category start -->
        <header-component-mobile-categories :product-type="productType" />
        <!-- mobile category end -->
        <div class="tp-main-menu-mobile fix d-lg-none mb-40">
          <!-- mobile menus start -->
          <header-component-mobile-menus />
          <!-- mobile menus end -->
        </div>

        <div class="offcanvas__contact align-items-center d-none">
          <div class="offcanvas__contact-icon mr-20">
            <span>
              <img src="/img/icon/contact.png" alt="contact_img" />
            </span>
          </div>
          <div class="offcanvas__contact-content">
            <h3 class="offcanvas__contact-title">
              <a href="tel:098-852-987">004524865</a>
            </h3>
          </div>
        </div>
        <div class="offcanvas__btn">
          <nuxt-link href="/contact" class="tp-btn-2 tp-btn-border-2">Contáctanos</nuxt-link>
        </div>
      </div>
      <div class="offcanvas__bottom">
        <div
          class="offcanvas__footer d-flex align-items-center justify-content-between"
        >
          <p class="hoff-footer-note">Bucaramanga, Colombia · 24/7 · info@hauled.shop</p>
        </div>
      </div>
    </div>
  </div>

  <div
    @click="utilsStore.handleOpenMobileMenu()"
    :class="`body-overlay ${utilsStore.openMobileMenus ? 'opened' : ''}`"
  ></div>
</template>

<script setup lang="ts">
import { useUtilityStore } from "@/pinia/useUtilityStore";
const props = defineProps<{ productType: string }>();
const utilsStore = useUtilityStore();

let isToggleActive = ref<string>("");
// handle active
const handleToggleActive = (type: string) => {
  if (type === isToggleActive.value) {
    isToggleActive.value = "";
  } else {
    isToggleActive.value = type;
  }
};
</script>

<style scoped>
.hoff-logo {
  display: inline-flex;
  flex-direction: column;
  text-decoration: none;
  gap: 2px;
}
.hoff-logo-word {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.6rem;
  letter-spacing: 8px;
  color: #111;
  text-transform: uppercase;
  line-height: 1;
}
.hoff-logo-sub {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.42rem;
  letter-spacing: 6px;
  color: #4CC9F0;
  text-transform: uppercase;
}
.hoff-footer-note {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: rgba(0,0,0,0.35);
  margin: 0;
}
</style>
