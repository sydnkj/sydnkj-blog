import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      darkMode: false,
      posts: {
        title: 'Loading...',
        headerTitle: false,
      },
    };
  },
});
