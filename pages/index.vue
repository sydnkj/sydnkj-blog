<script setup>
import ArticleLists from '@/index/ArticleLists.vue';
import CardCountDown from '@/index/CardCountDown.vue';
import Calendar from '@/index/Calendar.vue';
import CardSiteInfo from '@/index/CardSiteInfo.vue';
useHead({
  title: '小温技术知识 · 首页',
});
</script>
<template>
  <div id="body">
    <div class="column-big">
      <ArticleLists></ArticleLists>
    </div>
    <div class="column-small">
      <CardCountDown
        :countdowns="[
          {
            name: '2025年春节',
            date: '2025-01-29',
          },
          {
            name: '2026年春节',
            date: '2026-02-17',
          },
        ]"
      ></CardCountDown>
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
  margin-top: var(--gap-size);
}

.column-small {
  width: 25%;
  box-sizing: border-box;
  margin-bottom: 20px;
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
