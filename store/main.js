import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      // 暗黑模式
      darkMode: false,
      // 首页文章缓存
      articleLists: [],
      // 当前访问的文章信息
      posts: {
        title: 'Loading...',
        headerTitle: false,
      },
      // 工具缓存
      tools: {
        countdowns: [],
      },
      // 服务器状态
      server: {
        error: false,
      },
    };
  },
});
