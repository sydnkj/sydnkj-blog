<script setup>
import BigCard from '@/index/BigCard.vue';
// 从后端获取到的文章列表
const articleLists = ref([
  {
    articleId: 'ARC-001',
    title: '2025年AI大模型落地场景盘点：从工业到医疗',
    author: '李沐阳',
    createDate: '2025-08-25',
    summary:
      '深度解析AI大模型在工业质检、远程医疗、智能教育等6大领域的实际应用案例，对比不同模型的性能差异与成本优势。',
    commentCount: 215,
    category: '人工智能',
    tags: ['AI大模型', '行业应用', '技术落地', '2025趋势'],
  },
  {
    articleId: 'ARC-002',
    title: 'Linux系统RTC时间同步异常排查指南',
    author: '王运维',
    createDate: '2025-08-22',
    summary:
      '针对RTC与UTC时间偏差、硬件时钟模式不匹配等常见问题，提供分步排查流程，附`hwclock`与`timedatectl`命令实战案例。',
    commentCount: 156,
    category: '运维技术',
    tags: ['Linux', 'RTC时间', '命令行', '故障排查'],
  },
  {
    articleId: 'ARC-003',
    title: 'Python自动化办公：10行代码搞定Excel数据清洗',
    author: '张代码',
    createDate: '2025-08-20',
    summary: '基于`pandas`与`openpyxl`库，讲解如何快速处理重复值、缺失值，生成可视化报表，附带完整代码与测试数据。',
    commentCount: 389,
    category: '编程开发',
    tags: ['Python', '自动化办公', 'Excel', '数据分析'],
  },
  {
    articleId: 'ARC-004',
    title: '服务器功率优化方案：从硬件选型到软件调优',
    author: '赵架构',
    createDate: '2025-08-18',
    summary:
      '分析不同配置服务器（如98W入门级、500W企业级）的功耗差异，分享BIOS设置、进程管理、虚拟化技术降低能耗的方法。',
    commentCount: 98,
    category: '服务器技术',
    tags: ['服务器功耗', '硬件选型', '节能优化'],
  },
  {
    articleId: 'ARC-005',
    title: 'OpenWrt与ImmortalWrt固件对比：哪个更适合家用路由器？',
    author: '刘网络',
    createDate: '2025-08-15',
    summary: '从稳定性、插件生态、配置难度、更新频率四个维度对比两款固件，给出针对游戏加速、多设备联网的选型建议。',
    commentCount: 273,
    category: '网络技术',
    tags: ['OpenWrt', 'ImmortalWrt', '路由器固件', '家用网络'],
  },
  {
    articleId: 'ARC-006',
    title: 'GPU性能监测工具gputop实战：解读libigputop.so报错原因',
    author: '陈开发',
    createDate: '2025-08-12',
    summary: '结合实际案例（如invalid opcode报错），讲解gputop工具的安装配置，分析libigputop.so库的功能与兼容性问题。',
    commentCount: 132,
    category: '开发工具',
    tags: ['GPU监测', 'gputop', '动态链接库', '报错排查'],
  },
  {
    articleId: 'ARC-007',
    title: '多位数减法教学：从基础算法到巧算技巧',
    author: '孙老师',
    createDate: '2025-08-10',
    summary: '针对小学生数学学习痛点，拆解“相同数位对齐”“借位计算”核心逻辑，补充个位差推算等巧算方法，附练习题。',
    commentCount: 87,
    category: '教育科普',
    tags: ['数学教学', '减法算法', '小学生教育', '巧算技巧'],
  },
  {
    articleId: 'ARC-008',
    title: '2025年家用UPS选购指南：功率选型与品牌推荐',
    author: '周电器',
    createDate: '2025-08-08',
    summary: '讲解UPS与后备电源的本质区别，根据电脑、路由器、智能家居等设备功率，推荐500VA-1000VA高性价比型号。',
    commentCount: 203,
    category: '硬件科普',
    tags: ['UPS', '后备电源', '家用设备', '选购指南'],
  },
  {
    articleId: 'ARC-009',
    title: '前端性能优化：图片懒加载与代码分割实践',
    author: '吴前端',
    createDate: '2025-08-05',
    summary:
      '基于Vue3与React框架，演示如何通过`IntersectionObserver`实现图片懒加载，用Webpack拆分代码减少首屏加载时间。',
    commentCount: 312,
    category: '前端开发',
    tags: ['前端优化', '懒加载', '代码分割', 'Vue3', 'React'],
  },
  {
    articleId: 'ARC-010',
    title: '数据中心安全防护：防火墙规则配置与入侵检测',
    author: '郑安全',
    createDate: '2025-08-02',
    summary: '介绍数据中心网络分层防护架构，详解防火墙端口过滤、IP黑白名单配置，推荐Snort等入侵检测工具的部署方案。',
    commentCount: 145,
    category: '网络安全',
    tags: ['数据中心', '防火墙', '入侵检测', '安全防护'],
  },
]);
const articleCounts = ref(articleLists.value.length);
const displayCount = 10;
const showCounts = 5;
const currentPage = ref(1);
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(articleCounts.value / displayCount));
});
// 过滤文章
const displayArticleLists = computed(() => {
  return articleLists.value.slice((currentPage.value - 1) * displayCount, currentPage.value * displayCount);
});
// 生成显示的分页按钮列表
const displayPage = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  if (total <= showCounts) {
    for (let i = 1; i <= total; i++) {
      pages.push({ index: i, type: 'page' });
    }
    return pages;
  }
  let start = Math.max(2, current - Math.floor(showCounts / 2));
  let end = Math.min(total - 1, current + Math.floor(showCounts / 2));
  const delta = showCounts - (end - start + 1);
  if (delta > 0) {
    if (start - delta <= 1) {
      start = 2;
      end = Math.min(total - 1, start + showCounts - 1);
    } else {
      end = Math.min(total - 1, end + delta);
    }
  }
  pages.push({ index: 1, type: 'page' });
  if (start > 2) {
    pages.push({ index: '...', type: 'pre' });
  }
  for (let i = start; i <= end; i++) {
    pages.push({ index: i, type: 'page' });
  }
  if (end < total - 1) {
    pages.push({ index: '...', type: 'next' });
  }
  pages.push({ index: total, type: 'page' });
  return pages;
});
const prePage = () => {
  if (currentPage.value > 1) currentPage.value--;
  handlePageClick();
};
const addPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
  handlePageClick();
};
const changePage = (item) => {
  // 处理前省略号点击（向前跳页）
  if (item.type === 'pre') {
    const targetPage = Math.max(1, currentPage.value - showCounts);
    currentPage.value = targetPage;
    return;
  }
  // 处理后省略号点击（向后跳页）
  if (item.type === 'next') {
    const targetPage = Math.min(totalPages.value, currentPage.value + showCounts);
    currentPage.value = targetPage;
    return;
  }
  // 处理普通页码点击
  const page = item.index;
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
  handlePageClick();
};
const handlePageClick = () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth',
  });
};
</script>
<template>
  <div>
    <BigCard :data="displayArticleLists" />
    <!-- 分页 -->
    <div class="pagination-btns">
      <div class="pagination-btn-pages">
        <button class="pagination-btn" v-if="currentPage > 1" @click="prePage"><</button>
        <button
          class="pagination-btn"
          v-for="item in displayPage"
          :class="{ display: item.index === currentPage }"
          @click="changePage(item)"
        >
          {{ item.index }}
        </button>
        <button class="pagination-btn" v-if="currentPage < totalPages" @click="addPage">></button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.pagination-btns {
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  padding: 10px 20px;
  gap: calc(var(--gap-size) / 2);
  color: var(--text-color);
  margin-bottom: 20px;
  transition: all 0.25s ease-in-out;
}
.pagination-btns span {
  font-size: 14px;
  display: block;
}
.pagination-btn {
  min-width: 30px;
  height: 30px;
  box-sizing: border-box;
  background-color: var(--page-background-color);
  border: none;
  border-radius: 5px;
  transition: all 0.25s ease-in-out;
  color: var(--text-color);
}
.pagination-btn-pages {
  display: flex;
  flex-direction: row;
  gap: calc(var(--gap-size) / 2);
}
.pagination-btn.display,
.pagination-btn:active {
  background-color: var(--hover-text-color);
  cursor: pointer;
  color: white;
}
@media (max-width: 475px) {
  .pagination-btns {
    flex-direction: column;
    font-size: unset;
  }
}
@media (any-hover: hover) {
  .pagination-btn:hover {
    background-color: var(--hover-text-color);
    cursor: pointer;
    color: white;
  }
}
</style>
