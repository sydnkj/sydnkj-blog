<script setup>
import FlagIcon from '@assets/icons/FlagIcon.vue';
import CalendarIcon from '@assets/icons/CalendarIcon.vue';
import { ref } from 'vue';

// 接收的props，支持对象或数组
const props = defineProps({
  countdowns: {
    type: [Object, Array],
    required: true,
    validator: (value) => {
      // 验证数据格式
      if (Array.isArray(value)) {
        return value.every((item) => item.name && item.date);
      } else {
        return value.name && value.date;
      }
    },
  },
});

// 处理数据为数组格式
const countdownList = ref(Array.isArray(props.countdowns) ? props.countdowns : [props.countdowns]);

// 计算两个日期之间的天数（仅初始化时计算一次，刷新页面才更新）
const calculateDays = (targetDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// 格式化日期显示
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;
};

// 初始化时计算所有天数（仅执行一次）
countdownList.value = countdownList.value.map((item) => ({
  ...item,
  days: calculateDays(item.date),
  formattedDate: formatDate(item.date),
}));
</script>

<template>
  <div class="countdown-container">
    <!-- 循环渲染所有倒数日卡片，多条时向下排列 -->
    <div class="card-countdown">
      <div class="countdown-header">
        <div class="countdown-header-title">
          <FlagIcon></FlagIcon>
          <span>倒数日</span>
        </div>
      </div>
      <div class="countdown-body" v-for="(item, index) in countdownList" :key="index">
        <div class="countdown-body-icon">
          <CalendarIcon width="30px" />
        </div>
        <div class="countdown-body-expire">
          <span>距离{{ item.name }} - {{ item.formattedDate }}</span>
          <div>
            <span>{{ item.days < 0 ? '已过' : '还有' }}</span>
            <span style="font-size: 32px; font-weight: bold">
              {{ item.days == 0 ? '就是今天' : item.days < 0 ? item.days * -1 : item.days }}
            </span>
            <span v-if="item.days != 0">天</span>
          </div>
        </div>
      </div>
      <div class="countdown-footer"></div>
    </div>
  </div>
</template>

<style scoped>
/* 容器用于包裹多个卡片 */
.countdown-container {
  width: 100%;
  background-color: var(--hover-text-color);
  border-radius: 5px;
  overflow: hidden;
}

html.dark .countdown-header {
  color: #333;
}

.card-countdown {
  background-color: var(--background-color);
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
  box-shadow: 0 3px 12px rgb(0 0 0 / 5%);
}

.countdown-header {
  min-height: 40px;
  background-color: var(--hover-text-color);
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  transition: all 0.25s ease-in-out;
}

.countdown-header-title {
  font-size: 20px;
  display: flex;
  flex-direction: row;
  gap: 3px;
}

.countdown-header-title svg {
  width: 22px;
  vertical-align: sub;
}

.countdown-body {
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  align-items: center;
  gap: calc(var(--gap-size) * 1.25);
  transition: all 0.25s ease-in-out;
}

.countdown-body-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(100 181 246 / 10%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--hover-text-color);
  transition: all 0.25s ease-in-out;
}

.countdown-body-expire {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.countdown-footer {
  height: 2px;
  width: 100%;
  background-color: var(--hover-text-color);
  transition: all 0.25s ease-in-out;
}

@media (min-width: 475px) {
  .countdown-body-expire span {
    font-size: 14px;
  }
}
</style>
