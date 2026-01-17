export const TOKEN_KEY = 'access_token';
export const TOKEN_TYPE = 'token_type';
export const THEME_MODE = 'themeMode';

// 设置本地存储
const setStorage = (itemName: string, itemValue: unknown) =>
  localStorage.setItem(
    itemName,
    typeof itemValue == 'string' ? itemValue : JSON.stringify(itemValue)
  );

// 设置token
const setToken = (token: string) => setStorage(TOKEN_KEY, token);

// 获取本地存储
const getStorage = (itemName: string) => localStorage.getItem(itemName);

// 获取token
const getToken = () => getStorage(TOKEN_KEY);

// 删除本地存储
const removeStorage = (itemName: string) => localStorage.removeItem(itemName);

// 删除token
const removeToken = () => {
  removeStorage(TOKEN_KEY);
  removeStorage(TOKEN_TYPE);
};

// 清空所有本地存储
const clearAllStorage = () => {
  localStorage.clear();
};

export {
  clearAllStorage,
  getStorage,
  getToken,
  removeToken,
  setStorage,
  setToken,
  setUserinfo
};
