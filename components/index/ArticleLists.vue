<script setup>
import BigCard from '@/index/BigCard.vue';
import { useStore } from '~/store/main.js';
const store = useStore();
const errorMessage = ref('');
// 获取文章列表
if (!store.server.error) {
  const { data } = await useFetch('/api/articles/lists', { method: 'get', immediate: store.articleLists.length === 0 });
  if (data.value) {
    const resp = data.value;
    if (resp.status !== 'failed') {
      store.articleLists = resp.data;
    } else {
      errorMessage.value = resp.error.message;
    }
  }
}
// 分页功能
const articleCounts = ref(store.articleLists.length);
const displayCount = 10;
const showCounts = 5;
const currentPage = ref(1);
// 计算总共的页数
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(articleCounts.value / displayCount));
});
// 过滤文章
const displayArticleLists = computed(() => {
  return store.articleLists.slice((currentPage.value - 1) * displayCount, currentPage.value * displayCount);
});
// 生成显示的分页按钮列表
const displayPage = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  if (total <= showCounts) {
    for (let i = 1; i <= total; i++) {
      pages.push({ index: i, type: 'page' });
    }
    return pages;
  }
  let start = Math.max(2, current - Math.floor(showCounts / 2));
  let end = Math.min(total - 1, current + Math.floor(showCounts / 2));
  const delta = showCounts - (end - start + 1);
  if (delta > 0) {
    if (start - delta <= 1) {
      start = 2;
      end = Math.min(total - 1, start + showCounts - 1);
    } else {
      end = Math.min(total - 1, end + delta);
    }
  }
  pages.push({ index: 1, type: 'page' });
  if (start > 2) {
    pages.push({ index: '...', type: 'pre' });
  }
  for (let i = start; i <= end; i++) {
    pages.push({ index: i, type: 'page' });
  }
  if (end < total - 1) {
    pages.push({ index: '...', type: 'next' });
  }
  pages.push({ index: total, type: 'page' });
  return pages;
});
const prePage = () => {
  if (currentPage.value > 1) currentPage.value--;
  handlePageClick();
};
const addPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
  handlePageClick();
};
const changePage = (item) => {
  // 处理前省略号点击（向前跳页）
  if (item.type === 'pre') {
    const targetPage = Math.max(1, currentPage.value - showCounts);
    currentPage.value = targetPage;
    return;
  }
  // 处理后省略号点击（向后跳页）
  if (item.type === 'next') {
    const targetPage = Math.min(totalPages.value, currentPage.value + showCounts);
    currentPage.value = targetPage;
    return;
  }
  // 处理普通页码点击
  const page = item.index;
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
  handlePageClick();
};
const handlePageClick = () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth',
  });
};
</script>
<template>
  <div v-if="store.articleLists.length !== 0">
    <BigCard :data="displayArticleLists" />
    <!-- 分页 -->
    <div class="pagination-btns">
      <div class="pagination-btn-pages">
        <button class="pagination-btn" v-if="currentPage > 1" @click="prePage"><</button>
        <button
          class="pagination-btn"
          v-for="item in displayPage"
          :class="{ display: item.index === currentPage }"
          @click="changePage(item)"
        >
          {{ item.index }}
        </button>
        <button class="pagination-btn" v-if="currentPage < totalPages" @click="addPage">></button>
      </div>
    </div>
  </div>
  <h1 v-else>{{ errorMessage }}</h1>
</template>
<style scoped>
.pagination-btns {
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  padding: 10px 20px;
  gap: calc(var(--gap-size) / 2);
  color: var(--text-color);
  margin-bottom: 20px;
  transition: all 0.25s ease-in-out;
}
.pagination-btns span {
  font-size: 14px;
  display: block;
}
.pagination-btn {
  min-width: 30px;
  height: 30px;
  box-sizing: border-box;
  background-color: var(--page-background-color);
  border: none;
  border-radius: 5px;
  transition: all 0.25s ease-in-out;
  color: var(--text-color);
}
.pagination-btn-pages {
  display: flex;
  flex-direction: row;
  gap: calc(var(--gap-size) / 2);
}
.pagination-btn.display,
.pagination-btn:active {
  background-color: var(--hover-text-color);
  cursor: pointer;
  color: white;
}
@media (max-width: 475px) {
  .pagination-btns {
    flex-direction: column;
    font-size: unset;
  }
}
@media (any-hover: hover) {
  .pagination-btn:hover {
    background-color: var(--hover-text-color);
    cursor: pointer;
    color: white;
  }
}
</style>
