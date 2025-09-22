import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useStore } from '~/store/main';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useStore();
  const { data } = await useFetch('/api/ping', { method: 'get' });
  // 后端错误
  if (data.value?.status === 'failed') {
    store.server.error = true;
    const error = data.value?.error;
    store.server.errMessage = error?.message;
    // 不在错误页就跳转到错误页
    if (!to.path.startsWith(`/errors/`)) {
      return navigateTo(`/errors/${error?.statusCode}`);
      // 当前所在的错误页不是预期展示的错误页（错误代码错误）
    } else if (to.params?.code.toString() !== error?.statusCode.toString()) {
      return navigateTo(`/errors/${error?.statusCode}`);
    }
  }
  // 后端正常，判断是否在错误页，在就跳转到首页
  if (to.path.startsWith('/errors/')) {
    return navigateTo('/');
  }
});
