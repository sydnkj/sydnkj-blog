/**
 * 格式化时间
 * @param { Date } datetime
 * @param { 1: 2 : 3 } method 1:日期+时间 2:日期 3:时间
 * @returns
 */
const formatDate = (datetime, method = 1) => {
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const day = datetime.getDay();
  const hour = datetime.getHours();
  const minute = datetime.getMinutes();
  switch (method) {
    case 1:
      return `${year}年${month}月${day}日 ${hour}时${minute}分`;
    case 2:
      return `${year}年${month}月${day}日`;

    default:
      return `${hour}时${minute}分`;
  }
};

export { formatDate };
