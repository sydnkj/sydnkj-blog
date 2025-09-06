<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<template>
  <div id="body">
    <div class="post">
      <div class="post-title">文章标题</div>
      <div class="post-author">
        <div>作者</div>
        <div>日期</div>
      </div>
      <div class="post-content">
        <div>这里是文章的内容</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#body {
  animation-name: opacityInto;
  animation-duration: 0.5s;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.post {
  background-color: var(--background-color);
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.post-title {
  font-size: 26px;
  font-weight: bold;
}
.post-author {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 10px;
  gap: var(--gap-size);
}
.post-content {
  width: 100%;
}

@media (max-width: 475px) {
  .post {
    width: 90%;
  }
}
</style>
