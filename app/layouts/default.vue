<template>
  <div>
    <header-one />
    <main>
      <slot />
    </main>
    <footer-one :primary_style="true" />
    <back-to-top />
    <!-- <modal-product /> -->
    <cookie-banner />
  </div>
</template>

<script setup lang="ts"></script>
