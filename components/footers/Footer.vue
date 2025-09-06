<template>
  <footer>
    <div class="footer-container">
      <div class="footer-info">
        <div class="copyright">
          Copyright © {{ new Date().getFullYear() }}
          <a href="/" target="_self" class="site-link">小温技术知识</a>
        </div>
        <div class="powered-by">
          Powered by
          <a href="https://nuxt.com" target="_blank" class="tech-link">Nuxt.js</a>
          <span class="separator">·</span>
          <a href="https://vuejs.org" target="_blank" class="tech-link">Vue3</a>
        </div>
      </div>
      <div class="beian">
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" class="beian-link">
          赣ICP备2021001480号
        </a>
        <a
          href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36072202000221"
          target="_blank"
          class="beian-link"
        >
          赣公网安备36072202000221号
        </a>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-note">
        <span>本网站内容仅供参考，转载请注明出处</span>
      </div>
    </div>
  </footer>
</template>
<style scoped>
footer {
  background-color: #323232;
  min-height: 150px;
  width: 100%;
  color: var(--footer-text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  box-shadow: 0 -2px 10px rgb(0 0 0 / 15%);
  margin-top: auto;
}
.footer-container {
  max-width: 1200px;
  width: 100%;
  padding: 0 var(--gap-size);
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
}
.footer-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.copyright {
  font-size: 16px;
  letter-spacing: 0.3px;
}
.site-link {
  color: #b8c1cf;
  text-decoration: none;
  margin: 0 4px;
  transition: all 0.25s ease;
  position: relative;
}
.site-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #b8c1cf;
  transition: width 0.25s ease;
}
.site-link:hover {
  color: #e0e6ed;
  opacity: 1;
}
.site-link:hover::after {
  width: 100%;
}
.powered-by {
  font-size: 15px;
  color: #8d99ae;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.tech-link {
  color: #8d99ae;
  text-decoration: none;
  transition: color 0.25s ease;
}
.tech-link:hover {
  color: #b8c1cf;
  opacity: 1;
}
.separator {
  color: #6c757d;
}
.beian {
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  padding: 8px 0;
  justify-content: center;
  align-items: center;
}
.beian-link {
  color: #8d99ae;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.25s ease;
  display: inline-flex;
  align-items: center;
}
.beian-link:hover {
  color: #b8c1cf;
  opacity: 1;
}
.footer-divider {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgb(141 153 174 / 30%), transparent);
  margin: 5px 0;
}
.footer-note {
  font-size: 12px;
  color: #8d99ae;
  text-align: center;
  padding-top: 5px;
  letter-spacing: 0.5px;
}
/* 响应式调整 */
@media (width <= 768px) {
  .beian {
    flex-direction: column;
    gap: 6px;
  }
  .footer-container {
    gap: 10px;
  }
}
</style>
