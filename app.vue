<script setup>
import Header from './components/headers/Header.vue';
import Footer from './components//footers/Footer.vue';
import { useStore } from '~/store/main.js';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const store = useStore();
const { darkMode } = storeToRefs(store);
const router = useRouter();
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
});
// 检测后端是否正常，不正常跳转500页面
const { data } = await useFetch('/api/ping');
if (data.value.status === 'failed') {
  store.server.error = data.value.error;
  router.push('/errors/500');
}
</script>
<template>
  <Header></Header>
  <NuxtPage />
  <Footer></Footer>
</template>
