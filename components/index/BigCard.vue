<script setup>
import CommentIcon from '@assets/icons/CommentIcon.vue';
import HeartIcon from '@assets/icons/HeartIcon.vue';
import CalendarIcon from '@assets/icons/CalendarIcon.vue';
import { TransitionGroup } from 'vue';
const props = defineProps({
  data: Object,
});
</script>
<template>
  <div class="big-card-container">
    <TransitionGroup name="big-card" tag="div" class="big-card-list">
      <div class="big-card" v-for="item in props.data" :key="item.articleId">
        <div class="big-card-header">
          <NuxtLink :to="`/posts/${item.articleId}`">
            <div class="big-card-title">
              {{ item.title }}
            </div>
          </NuxtLink>
          <div class="big-card-author">
            <a href="#" target="_blank">{{ item.author }}</a>
            <div style="display: flex; align-items: center">
              <CalendarIcon></CalendarIcon>
              <span>{{ item.createDate }}</span>
            </div>
          </div>
        </div>
        <div class="big-card-description">{{ item.summary }}</div>
        <div class="big-card-info">
          <NuxtLink :to="`/posts/${item.articleId}`">
            <div class="big-card-info-more">
              <span>阅读全文</span>
              <span>→</span>
            </div>
          </NuxtLink>
          <div class="big-card-info-counts">
            <div class="big-card-info-count-item">
              <HeartIcon></HeartIcon>
              <span>{{ item.likeCount }}</span>
            </div>
            <div class="big-card-info-count-item">
              <CommentIcon></CommentIcon>
              <span>{{ item.commentCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
<style scoped>
.big-card-container {
  position: relative;
  width: 100%;
}
.big-card-list {
  display: block;
  transition: height 0.3s ease-in-out;
}
.big-card {
  box-sizing: border-box;
  padding: var(--gap-size);
  background-color: var(--background-color);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  transition: all 0.25s ease-in-out;
  box-shadow: 0 3px 12px rgb(0 0 0 / 5%);
  opacity: 1;
  transform: translateY(0);
}
.big-card-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.big-card-enter-active {
  transition: all 0.5s ease-in-out;
}
.big-card-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.big-card-leave-active {
  position: absolute;
  width: 100%;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.big-card-move {
  transition: transform 0.3s ease-in-out;
}
.big-card-header {
  border-bottom: dashed 1px var(--border-color);
  transition: all 0.25s ease-in-out;
}
.big-card-title {
  font-size: 22px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  transition: color 0.25s ease-in-out;
  margin-bottom: 14px;
  font-weight: bold;
  color: var(--text-color);
}

.big-card-author {
  display: flex;
  flex-direction: row;
  gap: var(--gap-size);
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
  padding-bottom: 14px;
  font-size: 16px;
  color: var(--text-color-light);
}
.big-card-author a {
  color: var(--text-color-light);
  transition: all 0.25s ease-in-out;
}
.big-card-author svg {
  width: 16px;
  vertical-align: baseline;
  padding-right: 4px;
}
.big-card-description {
  color: var(--description-text-color);
  box-sizing: border-box;
  padding: 10px 0;
  border-bottom: dashed 1px var(--border-color);
  transition: all 0.25s ease-in-out;
}
.big-card-info {
  font-size: 14px;
  color: var(--description-text-color);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-top: 10px;
}
.big-card-info a {
  color: var(--description-text-color);
  text-decoration: none;
  transition: all 0.25s ease-in-out;
}
.big-card-info-more {
  color: var(--hover-text-color);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
}
.big-card-info-more > span:nth-child(2) {
  display: inline-block;
  transition: all 0.25s ease-in-out;
  padding-left: 2px;
}

.big-card-info-counts {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
.big-card-info-count-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: default;
  gap: 4px;
  transition: all 0.25s ease-in-out;
}
.big-card-info-counts div svg {
  width: 18px;
  height: 18px;
  color: var(--hover-text-color);
  vertical-align: sub;
}
html.dark .big-card-title {
  color: var(--text-color);
}

/* hovers */
.big-card-title:hover {
  color: var(--hover-text-color);
}

@media (any-hover: hover) {
  .big-card:hover {
    transform: translateY(-2px);
    background-color: var(--big-card-hover-background-color);
  }
  html.dark .big-card-title:hover {
    color: var(--hover-text-color);
  }
  html.dark .big-card:hover {
    background-color: #3c3c3c;
  }
  .big-card-info-more:hover > span:nth-child(2) {
    transform: translateX(2px);
  }
  .big-card-info a:hover {
    opacity: 0.8;
  }
}
</style>
