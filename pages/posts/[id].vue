<script setup>
import { useStore } from '~/store/main.js';
import CalendarIcon from '@assets/icons/CalendarIcon';
import WordIcon from '@assets/icons/WordIcon.vue';
import ReadIcon from '@assets/icons/ReadIcon.vue';
import CommentIcon from '@assets/icons/CommentIcon.vue';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const store = useStore();
const titleRef = ref(null);
// 从后端获取数据
if (!store.server.error) {
  const { data } = await useFetch('/api/article/' + route.params.id, {
    method: 'get',
    immediate: store.articleInfo === undefined,
  });
  if (data.value) {
    const resp = data.value;
    if (resp.status !== 'failed') {
      store.articleInfo = resp.data;
    } else {
      errorMessage.value = resp.error.message;
    }
  }
}
onBeforeUnmount(() => {
  delete store.articleInfo;
});
useHead({
  title: store.articleInfo.title + ' · 书彦电脑科技',
});
// 检测滚动，当标题不可见时，在headers显示标题，限流150ms检测一次
let scrollFlag = true;
const handleScroll = () => {
  if (!scrollFlag || !store.posts.title) return;
  const rect = titleRef.value?.getBoundingClientRect();
  if (rect.top < -100) {
    store.posts.headerTitle = true;
  } else {
    store.posts.headerTitle = false;
  }
  scrollFlag = false;
  setTimeout(() => {
    scrollFlag = true;
  }, 150);
};
onMounted(() => {
  document.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll);
  store.posts.headerTitle = false;
});
</script>
<template>
  <div id="body">
    <div class="article-information" ref="titleRef">
      <div class="article-tags">
        <div class="article-tag" v-for="item in JSON.parse(store.articleInfo.tags)">#{{ item }}</div>
      </div>
      <div class="article-title">
        <span>{{ store.articleInfo.title }}</span>
      </div>
      <div class="article-info">
        <div class="article-info-date" title="发布日期">
          <CalendarIcon></CalendarIcon>
          <span>{{ new Date(store.articleInfo.create_date).toLocaleDateString() }}</span>
        </div>
        <div title="字数">
          <WordIcon></WordIcon>
          <span>{{ store.articleInfo.content.length }}</span>
        </div>
        <div title="阅读时间">
          <ReadIcon></ReadIcon>
          <span>{{ Math.max(1, Math.floor(Number(store.articleInfo.content.length / 200))) }}分钟</span>
        </div>
        <div title="评论数">
          <CommentIcon></CommentIcon>
          <span>{{ store.articleInfo.comment_count }}</span>
        </div>
      </div>
    </div>
    <article v-html="store.articleInfo.content" class="article-body" />
  </div>
</template>
<style scoped>
#body {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  animation-name: opacityInto;
  animation-duration: 1s;
}
#body * {
  transition: all 0.25s ease-in-out;
}
.article-information {
  box-sizing: border-box;
  padding-top: 50px;
}
.article-tags {
  display: flex;
  flex-direction: row;
  gap: var(--gap-size);
  color: var(--text-color);
}
.article-tag {
  box-sizing: border-box;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  background-color: var(--hover-background-color);
}
.article-title {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;
  font-size: 36px;
  font-weight: bold;
}
.article-info {
  font-size: 16px;
  display: flex;
  flex-direction: row;
  gap: var(--gap-size);
}
.article-info svg {
  width: 18px;
}
.article-info > div {
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  flex-direction: row;
  gap: 2px;
  cursor: pointer;
  border-radius: 5px;
}
.article-info > div:hover {
  background-color: var(--hover-background-color);
}
.article-info-date {
  font-size: 16px;
}
.article-body {
  background-color: var(--background-color);
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
  font-size: 18px;
  margin: 20px 0;
}
::v-deep(.article-body) p:nth-child(1) {
  margin-top: 0;
}
::v-deep(.article-body) p:nth-last-child(1) {
  margin-bottom: 0;
}
@media (max-width: 475px) {
  .article-information {
    padding: 50px 20px 0 20px;
  }
  .article-body {
    margin: 20px 10px;
  }
}
</style>
