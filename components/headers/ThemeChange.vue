<script setup>
import { storeToRefs } from 'pinia';
import SunnyIcon from '../../assets/icons/SunnyIcon.vue';
import MoonIcon from '../../assets/icons/MoonIcon.vue';
import { useStore } from '~/store/main.js';
const store = useStore();
const { darkMode } = storeToRefs(store);
</script>
<template>
  <div class="theme-change" @click="darkMode = !darkMode">
    <Transition name="theme" mode="out-in">
      <SunnyIcon style="color: orange" v-if="darkMode"></SunnyIcon>
      <MoonIcon style="color: #888" v-else></MoonIcon>
    </Transition>
  </div>
</template>
<style scoped>
.theme-change {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
}

.theme-change svg {
  width: 18px;
  height: 18px;
}

.theme-enter-active,
.theme-leave-active {
  transition: all 0.125s ease-in-out;
}

.theme-enter-from,
.theme-leave-to {
  transform: scale(0);
  opacity: 0;
}

.theme-enter-to,
.theme-leave-from {
  transform: scale(1);
  opacity: 1;
}

@media (any-hover: hover) {
  .theme-change:hover {
    background-color: var(--hover-background-color);
  }
}
</style>
