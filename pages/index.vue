<script setup>
import ArticleLists from '@/index/ArticleLists.vue';
import CardCountDown from '@/index/CardCountDown.vue';
import Calendar from '@/index/Calendar.vue';
import CardSiteInfo from '@/index/CardSiteInfo.vue';
import { useStore } from '~/store/main.js';
const store = useStore();
// 配置网页标题
useHead({
  title: '信丰县书彦电脑科技 · 首页',
});
</script>
<template>
  <div id="body">
    <div class="column-big">
      <ArticleLists />
    </div>
    <div class="column-small">
      <CardCountDown></CardCountDown>
      <Calendar></Calendar>
      <CardSiteInfo></CardSiteInfo>
    </div>
  </div>
</template>
<style scoped>
#body {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  animation-name: opacityInto;
  animation-duration: 1s;
}

.column-big {
  width: 75%;
  box-sizing: border-box;
  padding-right: 20px;
  margin: var(--gap-size) 0;
}

.column-small {
  width: 25%;
  box-sizing: border-box;
  margin: var(--gap-size) 0;
}

/* 响应式 */
@media (max-width: 475px) {
  #body {
    flex-direction: column;
    align-items: center;
  }
  .column-big {
    width: 90%;
    padding-right: unset;
  }
  .column-small {
    width: 90%;
  }
}
</style>
