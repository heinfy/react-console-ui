import Cookie from 'js-cookie';

export const clearAllCookies = (): void => {
  Cookie.remove('refresh_token');
  // 可以添加更多需要清理的cookie
};
