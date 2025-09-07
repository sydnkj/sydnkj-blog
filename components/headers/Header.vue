<script setup>
import ThemeChange from './ThemeChange.vue';
import Logo from './Logo.vue';
import { useStore } from '~/store/main.js';
const store = useStore();
const toTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
<template>
  <header>
    <div class="header-container">
      <div class="header-item header-logo">
        <Logo />
      </div>
      <div class="header-item header-post">
        <Transition name="header-title-fade" mode="out-in">
          <!-- 显示当前文章标题 -->
          <div class="header-post-title" @click="toTop" v-if="store.posts.headerTitle">{{ store.posts.title }}</div>
          <!-- 显示网页菜单 -->
          <div v-else>
            <span>首页</span>
          </div>
        </Transition>
      </div>
      <div class="header-item header-actions">
        <ThemeChange />
      </div>
    </div>
  </header>
</template>
<style scoped>
header {
  height: 64px;
  width: 100%;
  background-color: var(--header-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease-in-out;
  box-sizing: border-box;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 8%);
  position: sticky;
  top: 0;
  z-index: 99;
  backdrop-filter: blur(10px);
}
.header-container {
  max-width: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.header-item {
  display: flex;
  align-items: center;
}
.header-logo {
  height: 100%;
}
.header-actions {
  gap: 16px;
}
.header-title-fade-enter-active,
.header-title-fade-leave-active {
  transition: all 0.25s ease-in-out;
}
.header-title-fade-enter-from,
.header-title-fade-leave-to {
  transform: translateY(-60px);
}
.header-title-fade-enter-to,
.header-title-fade-leave-from {
  transform: translateY(0);
}
.header-post-title {
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}
html.dark header {
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
}
@media (max-width: 475px) {
  .header-container {
    align-items: center;
    justify-content: center;
  }
  .header-item.header-actions {
    display: none;
  }
  .header-item.header-post {
    display: none;
  }
}
</style>
