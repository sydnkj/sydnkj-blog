<script setup>
import Header from '@/headers/Header.vue';
import Footer from '@/footers/Footer.vue';
import { useStore } from '~/store/main.js';
import { storeToRefs } from 'pinia';
const store = useStore();
const { darkMode } = storeToRefs(store);
useHead({
  htmlAttrs: {
    class: { dark: darkMode },
  },
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    },
  ],
});
</script>
<template>
  <Header></Header>
  <NuxtPage />
  <Footer></Footer>
</template>
