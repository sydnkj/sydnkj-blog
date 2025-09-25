<script setup>
import CommentIcon from '../../assets/icons/comment-icon.vue';
import CalendarIcon from '../../assets/icons/calendar-icon.vue';
import { formatDate } from '../../utils/date';
const props = defineProps({
  data: Object,
});
</script>
<template>
  <div class="big-card-container">
    <div class="big-card" v-for="item in props.data" :key="item.id">
      <div class="big-card-header">
        <div class="big-card-title">
          <span class="big-card-category">{{ item.category }}</span>
          <NuxtLink :to="'/posts/' + item.id">
            <span class="big-card-title-content">{{ item.title }}</span>
          </NuxtLink>
        </div>
        <div class="big-card-author">
          <NuxtLink :to="'#/users/' + item.author_id" target="_blank">{{ item.author }}</NuxtLink>
          <div style="display: flex; align-items: center">
            <CalendarIcon></CalendarIcon>
            <span>{{ formatDate(new Date(item.create_date), 2) }}</span>
          </div>
        </div>
      </div>
      <div class="big-card-description">{{ item.summary }}</div>
      <div class="big-card-info">
        <div class="big-card-info-tags">
          <div class="big-card-info-tag" v-for="tags in JSON.parse(item.tags)">
            <NuxtLink :to="`#/tags/${tags}`">#{{ tags }}</NuxtLink>
          </div>
        </div>
        <div class="big-card-info-right">
          <div class="big-card-info-counts">
            <div class="big-card-info-count-item">
              <CommentIcon></CommentIcon>
              <span>{{ item.comment_count }}</span>
            </div>
          </div>
          <NuxtLink :to="`/posts/${item.id}`">
            <div class="big-card-info-more">
              <span>阅读全文</span>
              <span>→</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
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
.big-card-header {
  border-bottom: dashed 1px var(--border-color);
  transition: all 0.25s ease-in-out;
}
.big-card-header a {
  color: var(--text-color);
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
.big-card-info-tags,
.big-card-info-right {
  display: flex;
  flex-direction: row;
  gap: calc(var(--gap-size) / 2);
}
.big-card-info-tag,
.big-card-info-tag a {
  cursor: pointer;
  color: var(--text-color);
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
.big-card-category {
  font-size: 14px;
  font-weight: normal;
  display: inline-block;
  box-sizing: border-box;
  padding: 4px;
  border-radius: 5px;
  border: 1px dotted var(--border-color);
}
.big-card-title-content {
  margin-left: 10px;
}

/* hovers */
.big-card-title-content:hover {
  color: var(--hover-text-color);
}

@media (any-hover: hover) {
  .big-card:hover {
    transform: translateY(-2px);
    background-color: var(--big-card-hover-background-color);
  }
  html.dark .big-card-title-content:hover {
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
  .big-card-category:hover {
    color: var(--hover-text-color);
  }
}
@media (max-width: 475px) {
  .big-card-info-tag {
    display: none;
  }
}
</style>
