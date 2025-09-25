<script setup>
import { useStore } from '~/store/main.js';
import CalendarIcon from '../../assets/icons/calendar-icon';
import WordIcon from '../../assets/icons/word-icon.vue';
import ReadIcon from '../../assets/icons/read-icon.vue';
import CommentIcon from '../../assets/icons/comment-icon.vue';
import FolderIcon from '../../assets/icons/folder-icon.vue';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Viewer } from '@bytemd/vue-next';
import hljs from '@bytemd/plugin-highlight-ssr';
import '../../assets/github-markdown.css';
import '../../assets/github-hljs.css';
import { formatDate } from '../../utils/date';

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
  link: [],
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
  }, 50);
};
onMounted(() => {
  if (!import.meta.env.SSR) {
    nextTick(() => {
      document.addEventListener('scroll', handleScroll);
    });
  }
});
onUnmounted(() => {
  if (!import.meta.env.SSR) {
    nextTick(() => {
      document.removeEventListener('scroll', handleScroll);
      store.posts.headerTitle = false;
    });
  }
});
</script>
<template>
  <div id="body">
    <div class="article-information" ref="titleRef">
      <div class="article-title">
        <span>{{ articleData.title }}</span>
      </div>
      <div class="article-info">
        <div class="article-info-date" title="发布日期">
          <CalendarIcon></CalendarIcon>
          <span>{{ formatDate(new Date(articleData.create_date)) }}</span>
        </div>
        <div title="分类">
          <FolderIcon></FolderIcon>
          <span>分类于 {{ articleData.category }}</span>
        </div>
        <div title="字数">
          <WordIcon></WordIcon>
          <span>{{ articleData.content.length }} 字</span>
        </div>
        <div title="阅读时间">
          <ReadIcon></ReadIcon>
          <span>大约 {{ Math.max(1, Math.floor(Number(articleData.content.length / 300))) }} 分钟</span>
        </div>
        <div title="评论数">
          <CommentIcon></CommentIcon>
          <span>{{ articleData.comment_count }} 条评论</span>
        </div>
      </div>
    </div>
    <Viewer class="markdown-body" :value="articleData.content" :plugins="bytemdPlugins"></Viewer>
    <div class="article-tags">
      <div class="article-tag" v-for="item in JSON.parse(articleData.tags)">#{{ item }}</div>
    </div>
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
  padding: 20px;
  box-sizing: border-box;
}
.article-information {
  box-sizing: border-box;
  padding-top: 30px;
}
.article-tags {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--gap-size);
  color: var(--text-color);
  justify-content: center;
}
.article-tag {
  box-sizing: border-box;
  border-radius: 5px;
  padding: 4px;
  cursor: pointer;
  background-color: var(--background-color);
  transition: all 0.25s ease-in-out;
}
.article-title {
  width: 100%;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: bold;
}
.article-info {
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: var(--gap-size);
  margin-top: 10px;
}
.article-info svg {
  width: 18px;
}
.article-info > div {
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  cursor: pointer;
  border-radius: 5px;
}
.article-info-date {
  font-size: 16px;
}
::v-deep([id]) {
  scroll-margin-top: 90px;
}
.markdown-body {
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  transition: all 0.25s ease-in-out;
  margin-top: 20px;
}
::v-deep(.markdown-body) * {
  transition: all 0.25s ease-in-out;
}
.markdown-body.bigger {
  font-size: 18px;
}
.markdown-body.bigger .hljs {
  font-size: 16px;
}
@media (max-width: 475px) {
  .article-tags {
    font-size: 12px;
    padding: 2px;
    row-gap: calc(var(--gap-size) / 3);
    column-gap: 0;
  }
  .article-info {
    font-size: 16px;
    row-gap: calc(var(--gap-size) / 3);
    column-gap: 0;
  }
}
@media (any-hover: hover) {
  .article-info > div:hover {
    background-color: var(--hover-background-color);
  }
}
</style>
