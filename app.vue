<script setup>
import Header from '~/components/headers/header.vue';
import Footer from '~/components/footers/footer.vue';
import { useStore } from '~/store/main.js';
import { storeToRefs } from 'pinia';
const store = useStore();
const { darkMode } = storeToRefs(store);
// 配置网页信息
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
  link: [
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css',
    },
  ],
});
</script>
<template>
  <Header></Header>
  <NuxtPage />
  <Footer></Footer>
</template>
