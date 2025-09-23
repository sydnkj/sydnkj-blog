<script setup>
import CalendarIcon from '../../assets/icons/calendar-icon.vue';
import { onMounted, ref } from 'vue';

// 获取当前日期信息
const currentDate = ref(new Date());
const year = ref(currentDate.value.getFullYear());
const month = ref(currentDate.value.getMonth() + 1); // 月份从1开始
const daysInMonth = ref([]);
const monthName = ref('');

// 月份名称映射
const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

// 生成当月日历
const generateCalendar = () => {
  const days = [];
  const firstDay = new Date(year.value, month.value - 1, 1);
  const lastDay = new Date(year.value, month.value, 0);
  const totalDays = lastDay.getDate();
  const firstDayOfWeek = firstDay.getDay() || 7; // 转换为周一为1，周日为7

  monthName.value = monthNames[month.value - 1];

  // 添加上月占位天数
  for (let i = 1; i < firstDayOfWeek; i++) {
    days.push({ day: '', isCurrentMonth: false });
  }

  // 添加当月天数
  for (let i = 1; i <= totalDays; i++) {
    const isToday =
      i === currentDate.value.getDate() &&
      month.value === currentDate.value.getMonth() + 1 &&
      year.value === currentDate.value.getFullYear();

    days.push({
      day: i,
      isCurrentMonth: true,
      isToday,
    });
  }

  daysInMonth.value = days;
};

onMounted(generateCalendar);
</script>

<template>
  <div class="card-calendar">
    <div class="calendar-header">
      <div class="calendar-header-title">
        <CalendarIcon></CalendarIcon>
        <span>{{ year }}年 {{ monthName }}</span>
      </div>
      <div class="calendar-header-today">
        {{ currentDate.getFullYear() }}-{{ (currentDate.getMonth() + 1).toString().padStart(2, '0') }}-{{
          currentDate.getDate().toString().padStart(2, '0')
        }}
      </div>
    </div>

    <!-- 星期标题 -->
    <div class="calendar-weekdays">
      <div class="weekday">一</div>
      <div class="weekday">二</div>
      <div class="weekday">三</div>
      <div class="weekday">四</div>
      <div class="weekday">五</div>
      <div class="weekday">六</div>
      <div class="weekday">日</div>
    </div>

    <!-- 日历主体 -->
    <div class="calendar-body">
      <div
        v-for="(day, index) in daysInMonth"
        :key="index"
        class="calendar-day"
        :class="{
          'other-month': !day.isCurrentMonth,
          today: day.isToday,
        }"
      >
        {{ day.day }}
      </div>
    </div>

    <div class="calendar-footer"></div>
  </div>
</template>

<style scoped>
.card-calendar {
  margin-top: 20px;
  background-color: var(--background-color);
  border-radius: 5px;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.25s ease-in-out;
  box-shadow: 0 3px 12px rgb(0 0 0 / 5%);
}

.calendar-header {
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

.calendar-header-title {
  font-size: 20px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
}

.calendar-header-title svg {
  width: 22px;
  vertical-align: sub;
}

.calendar-header-today {
  font-size: 14px;
  opacity: 0.9;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 8px 10px;
  background-color: rgb(100 181 246 / 5%);
  border-bottom: 1px solid rgb(0 0 0 / 5%);
}

.weekday {
  text-align: center;
  font-size: 13px;
  color: var(--text-color-secondary);
  padding: 5px 0;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  padding: 10px;
  min-height: 203px;
}

.calendar-day {
  text-align: center;
  padding: 8px 5px;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.calendar-day:not(.today):hover {
  background-color: #f7fbff;
}

.calendar-day.other-month {
  color: var(--text-color-disabled);
  opacity: 0.4;
}

.calendar-day.today {
  background-color: var(--hover-text-color);
  color: white;
  font-weight: bold;
}

.calendar-footer {
  height: 2px;
  width: 100%;
  background-color: var(--hover-text-color);
  transition: all 0.25s ease-in-out;
}

/* 深色模式适配 */
html.dark .calendar-header {
  color: #333;
}

html.dark .calendar-weekdays {
  background-color: rgb(100 181 246 / 3%);
  border-bottom-color: rgb(255 255 255 / 5%);
}

html.dark .calendar-day:not(.today):hover {
  background-color: rgb(100 181 246 / 3%);
}
</style>
