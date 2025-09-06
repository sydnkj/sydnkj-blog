<template>
  <div class="card-site-info">
    <div class="card-site-info-header">
      <span>站点信息</span>
    </div>
    <div class="card-site-info-body">
      <div class="card-site-info-items">
        <div>文章总数</div>
        <div>10</div>
      </div>
      <div class="card-site-info-items">
        <div>评论总数</div>
        <div>50</div>
      </div>
      <div class="card-site-info-items">
        <div>建站天数</div>
        <div>100</div>
      </div>
      <div class="card-site-info-items">
        <div>最后更新</div>
        <div>2025-08-27 14:14:00</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card-site-info {
  margin-top: 20px;
  border-radius: 5px;
  overflow: hidden;
}
.card-site-info-header {
  color: white;
  background-color: var(--hover-text-color);
  box-sizing: border-box;
  padding: 10px;
  font-size: 20px;
}
.card-site-info-body {
  background-color: var(--background-color);
  box-sizing: border-box;
  padding: 10px;
  transition: all 0.25s ease-in-out;
}
.card-site-info-items {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 40px;
}
</style>
