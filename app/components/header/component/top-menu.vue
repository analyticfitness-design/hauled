<template>
  <div class="tp-header-top-menu d-flex align-items-center justify-content-end">
    <div class="tp-header-top-menu-item tp-header-lang">
      <span @click="handleActive('lang')" class="tp-header-lang-toggle" id="tp-header-lang-toggle">English</span>
      <ul :class="`${isActive === 'lang' ? 'tp-lang-list-open' : ''}`">
        <li>
          <a href="#">Spanish</a>
        </li>
        <li>
          <a href="#">Russian</a>
        </li>
        <li>
          <a href="#">Portuguese</a>
        </li>
      </ul>
    </div>
    <div class="tp-header-top-menu-item tp-header-currency">
      <span @click="handleActive('currency')" class="tp-header-currency-toggle" id="tp-header-currency-toggle">USD</span>
      <ul :class="`${isActive === 'currency' ? 'tp-currency-list-open' : ''}`">
        <li>
          <a href="#">EUR</a>
        </li>
        <li>
          <a href="#">CHF</a>
        </li>
        <li>
          <a href="#">GBP</a>
        </li>
        <li>
          <a href="#">KWD</a>
        </li>
      </ul>
    </div>
    <div class="tp-header-top-menu-item tp-header-setting">
      <span @click="handleActive('setting')" class="tp-header-setting-toggle" id="tp-header-setting-toggle">
        {{ auth.isLoggedIn ? auth.displayName : 'Cuenta' }}
      </span>
      <ul :class="`${isActive === 'setting' ? 'tp-setting-list-open' : ''}`">
        <template v-if="auth.isLoggedIn">
          <li>
            <nuxt-link href="/profile">Mi cuenta</nuxt-link>
          </li>
          <li>
            <nuxt-link href="/wishlist">Lista de deseos</nuxt-link>
          </li>
          <li>
            <nuxt-link href="/cart">Carrito</nuxt-link>
          </li>
          <li>
            <a href="#" @click.prevent="onLogout">Cerrar sesión</a>
          </li>
        </template>
        <template v-else>
          <li>
            <nuxt-link href="/login">Iniciar sesión</nuxt-link>
          </li>
          <li>
            <nuxt-link href="/register">Crear cuenta</nuxt-link>
          </li>
          <li>
            <nuxt-link href="/wishlist">Lista de deseos</nuxt-link>
          </li>
          <li>
            <nuxt-link href="/cart">Carrito</nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/pinia/useAuthStore';

const auth = useAuthStore();

let isActive = ref<string>('');

const handleActive = (type: string) => {
  if (type === isActive.value) {
    isActive.value = '';
  } else {
    isActive.value = type;
  }
};

async function onLogout() {
  isActive.value = '';
  await auth.logout();
}
</script>
