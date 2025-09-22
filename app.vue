<script setup>
import Header from '~/components/headers/Header.vue';
import Footer from '~/components//footers/Footer.vue';
import { useStore } from '~/store/main.js';
const store = useStore();
// 配置网页信息
useHead({
  htmlAttrs: {
    class: store.darkMode ? 'dark' : '',
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
