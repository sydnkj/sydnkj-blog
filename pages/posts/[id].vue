<script setup>
import { useStore } from '~/store/main.js';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import WordIcon from '../../assets/icons/WordIcon.vue';
import ReadIcon from '../../assets/icons/ReadIcon.vue';
import CommentIcon from '../../assets/icons/CommentIcon.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Viewer } from '@bytemd/vue-next';
import hljs from '@bytemd/plugin-highlight-ssr';
import 'highlight.js/styles/github.css';

const route = useRoute();
const store = useStore();
const titleRef = ref(null);
const articleData = ref({});
const bytemdPlugins = [hljs()];
// 从后端获取数据
if (!store.server.error) {
  const resp = await useFetch(`/api/article/${route.params.id}`, {
    method: 'get',
  });
  const { data } = resp;
  if (data.value) {
    const result = data.value;
    if (result.status !== 'failed') {
      articleData.value = result.data;
      store.posts.title = result.data.title;
    } else {
      errorMessage.value = resp.error.message;
    }
  }
}
useHead({
  title: articleData.value.title + ' · 书彦电脑科技',
  link: [
    { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.8.1/github-markdown.css' },
  ],
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
        <div class="article-tag" v-for="item in JSON.parse(articleData.tags)">#{{ item }}</div>
      </div>
      <div class="article-title">
        <span>{{ articleData.title }}</span>
      </div>
      <div class="article-info">
        <div class="article-info-date" title="发布日期">
          <CalendarIcon></CalendarIcon>
          <span>{{ new Date(articleData.create_date).toLocaleString() }}</span>
        </div>
        <div title="字数">
          <WordIcon></WordIcon>
          <span>{{ articleData.content.length }}字</span>
        </div>
        <div title="阅读时间">
          <ReadIcon></ReadIcon>
          <span>{{ Math.max(1, Math.floor(Number(articleData.content.length / 300))) }}分钟</span>
        </div>
        <div title="评论数">
          <CommentIcon></CommentIcon>
          <span>{{ articleData.comment_count }}条评论</span>
        </div>
      </div>
    </div>
    <!-- <article v-html="articleContent" class="markdown-body"></article> -->
    <Viewer class="markdown-body" :value="articleData.content" :plugins="bytemdPlugins"></Viewer>
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
::v-deep(.markdown-body) {
  background-color: var(--background-color);
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
  font-size: 18px;
  margin: 20px 0;
}
::v-deep([id]) {
  scroll-margin-top: 90px;
}
::v-deep(.markdown-body) p:nth-child(1) {
  margin-top: 0;
}
::v-deep(.markdown-body) p:nth-last-child(1) {
  margin-bottom: 0;
}
@media (max-width: 475px) {
  .article-information {
    padding: 50px 20px 0 20px;
  }
  .markdown-body {
    margin: 20px 10px;
  }
}
</style>
