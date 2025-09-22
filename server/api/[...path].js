import axios from 'axios';
export default defineEventHandler(async (event) => {
  const date = new Date().toLocaleString();
  // 构造请求参数
  let { headers, method, originalUrl } = event.node.req;
  const protocol = 'http';
  const host = process.env.SERVER_HOST || '127.0.0.1';
  const port = process.env.SERVER_PORT || 4000;
  // 删除无用请求头
  const forbiddenHeaders = [
    'host',
    'content-length',
    'connection',
    'upgrade',
    'upgrade-insecure-requests',
    'proxy-authorization',
    'x-forwarded-for',
    'x-forwarded-proto',
    'x-forwarded-port',
    'cache-control',
    'pragma',
    'if-modified-since',
    'if-none-match',
  ];
  forbiddenHeaders.forEach((item) => delete headers[item]);
  headers['x-from-source'] = 'ssr-server';
  method = method.toLowerCase();
  // 构造Body
  const body =
    method == 'get'
      ? null
      : await readBody(event).catch((error) => {
          console.log(error);
          return {
            status: 'failed',
            error,
          };
        });
  // 拼接后端路径
  const url = `${protocol}://${host}${
    (protocol === 'http' && port === 80) || (protocol === 'https' && port === 443) ? '' : ':' + port
  }${originalUrl}`;
  console.log(`[${date}] 请求后端：${url}`);
  // 请求后端
  try {
    const result = await axios({
      method,
      url,
      data: body,
    });
    return result.data;
  } catch (err) {
    console.log(`[${date}] server/api Error: ${err.message || err.code}`); // 后续替换更高级的日志系统
    let message =
      err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message;
    let statusCode = null;
    if (message?.includes('connect ECONNREFUSED')) {
      message = '与后端建立连接时发生错误，请联系管理员';
      statusCode = 500;
    }
    return {
      status: 'failed',
      error: {
        statusCode,
        message: message || '发生未知错误',
      },
    };
  }
});
