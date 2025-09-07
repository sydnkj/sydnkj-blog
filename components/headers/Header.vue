<script setup>
import ThemeChange from './ThemeChange.vue';
import Logo from './Logo.vue';
</script>
<template>
  <header>
    <div class="header-container">
      <div class="header-item header-logo">
        <Logo />
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
}
</style>
