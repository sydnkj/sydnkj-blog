<script setup>
import { useRoute } from 'vue-router';
import { useStore } from '~/store/main.js';
const store = useStore();
const route = useRoute();
const codeMessage = {
  400: 'Bad Request（请求参数错误或格式无效）',
  401: 'Unauthorized（未授权，需登录或令牌无效）',
  402: 'Payment Required（需要付费）',
  403: 'Forbidden（服务器拒绝访问，权限不足）',
  404: 'Not Found（请求的资源不存在）',
  405: 'Method Not Allowed（请求方法不被允许）',
  406: 'Not Acceptable（服务器无法返回请求头指定格式的内容）',
  407: 'Proxy Authentication Required（需通过代理服务器认证）',
  408: 'Request Timeout（请求超时，服务器未在规定时间内收到完整请求）',
  409: 'Conflict（请求与服务器当前状态冲突）',
  410: 'Gone（请求的资源已永久删除，无法恢复）',
  411: 'Length Required（请求缺少 Content-Length 头，服务器无法处理）',
  412: 'Precondition Failed（请求头中的前置条件不满足）',
  413: 'Payload Too Large（请求体过大，超出服务器限制）',
  414: 'URI Too Long（请求的 URI 过长，服务器无法处理）',
  415: 'Unsupported Media Type（请求体格式不被支持）',
  416: 'Range Not Satisfiable（请求的字节范围无效或超出资源长度）',
  417: 'Expectation Failed（服务器无法满足请求头中的 Expect 条件）',
  422: 'Unprocessable Entity（请求格式正确，但语义错误）',
  423: 'Locked（请求的资源被锁定，无法操作）',
  424: 'Failed Dependency（请求依赖的其他操作失败）',
  425: 'Too Early（请求过早，服务器尚未准备好处理）',
  426: 'Upgrade Required（需升级协议）',
  428: 'Precondition Required（服务器要求必须携带前置条件头）',
  429: 'Too Many Requests（请求过于频繁，触发限流）',
  431: 'Request Header Fields Too Large（请求头总大小超出服务器限制）',
  451: 'Unavailable For Legal Reasons（因法律原因，资源无法访问）',
  500: 'Internal Server Error（服务器内部错误）',
  501: 'Not Implemented（服务器不支持该请求方法或功能）',
  502: 'Bad Gateway（网关错误，服务器作为网关时收到上游无效响应）',
  503: 'Service Unavailable（服务暂时不可用）',
  504: 'Gateway Timeout（网关超时，服务器作为网关时上游无响应）',
  505: 'HTTP Version Not Supported（服务器不支持请求使用的 HTTP 版本）',
  506: 'Variant Also Negotiates（内容协商机制异常，资源存在多个变体）',
  507: 'Insufficient Storage（服务器存储不足，无法完成请求）',
  508: 'Loop Detected（服务器检测到无限循环，终止请求）',
  510: 'Not Extended（请求需要额外扩展，服务器未满足）',
  511: 'Network Authentication Required（需网络认证）',
};
</script>
<template>
  <h1>{{ route.params.code }}</h1>
  <h2>{{ store.server.errMessage ?? codeMessage[route.params.code] }}</h2>
</template>
