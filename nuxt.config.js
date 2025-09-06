import { resolve } from 'node:path';
// API配置文档：https://nuxt.com/docs/api/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  compatibilityDate: '2025-08-01',
  alias: {
    '~': __dirname,
    '@assets': resolve(__dirname, './assets'),
    '@': resolve(__dirname, './components'),
  },
  devServer: {
    port: 8888,
  },
  css: ['./assets/global.css'],
  modules: ['@pinia/nuxt'],
});
