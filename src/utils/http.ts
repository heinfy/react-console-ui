import { API_PREFIX } from '@/config';
import { getStorage, TOKEN_TYPE } from '@/utils/storage';
import { message } from 'antd';
import { clearAllStorage, getToken, setToken } from './storage';
interface FetchOptions extends RequestInit {
  showLoading?: boolean;
  handleError?: boolean;
  isStreaming?: boolean;
}

let loadingCount = 0;
let hideLoading: () => void = () => {};

const showLoading = (show: boolean) => {
  if (show) {
    if (loadingCount === 0) {
      hideLoading = message.loading('loading...', 0);
    }
    loadingCount++;
  } else {
    loadingCount--;
    if (loadingCount <= 0) {
      loadingCount = 0;
      hideLoading();
    }
  }
};

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null; // 缓存 refresh 请求，避免并发多次刷新
const pendingRequests: Array<(token: string) => void> = [];
// 刷新令牌
const refreshToken = async (): Promise<string> => {
  const response = await fetch(`${API_PREFIX}/auth/refresh`);

  if (response.status === 420) {
    // refresh_token 也过期
    clearAllStorage();
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  const newAccessToken = data.access_token;
  setToken(newAccessToken);
  return newAccessToken;
};

// 请求拦截器
const requestInterceptor = (
  _url: string,
  options: FetchOptions
): FetchOptions => {
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const token = getToken();

  if (token) {
    headers.set('Authorization', `${getStorage(TOKEN_TYPE)} ${token}`);
  }

  return {
    ...options,
    headers
  };
};

// 响应拦截器
const responseInterceptor = async (
  response: Response,
  isStreaming: boolean
) => {
  if (response.status === 420) {
    message.error('认证已过期，请重新登录');
    clearAllStorage();
    window.location.href = '/login';
    return;
  }

  if (response.status === 400) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || '请求参数错误');
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  }

  if (isStreaming) return response;

  const data = await response.json();
  return data;
};

// 核心请求方法（支持自动重试）
const performRequest = async <T>(
  method: string,
  url: string,
  body: unknown = null,
  options: FetchOptions = {}
): Promise<T> => {
  const {
    showLoading: showLoadingOption = false,
    handleError = true,
    isStreaming = false,
    ...fetchOptions
  } = options;

  let config: FetchOptions = { method, ...fetchOptions };
  if (body !== null) {
    config.body = JSON.stringify(body);
  }

  config = requestInterceptor(url, config);

  try {
    if (showLoadingOption) showLoading(true);

    const response = await fetch(`${API_PREFIX}${url}`, config);

    // 特殊处理：429 限流（仅针对聊天接口）
    if (response.status === 429 && url.includes('/chat')) {
      showLoading(false);
      throw new Error('当前访问人数过多，请稍后再试');
    }

    // 处理 401：access_token 过期
    if (response.status === 401) {
      showLoading(false);

      // 如果正在刷新，等待刷新完成
      if (isRefreshing) {
        await refreshPromise!;
        // 用新 token 重试当前请求
        return performRequest(method, url, body, options);
      }

      // 开始刷新流程
      isRefreshing = true;
      refreshPromise = refreshToken()
        .then(newToken => {
          // 刷新成功，重放 pending 请求
          pendingRequests.forEach(callback => callback(newToken));
          pendingRequests.length = 0;
          return newToken;
        })
        .catch(error => {
          // 刷新失败，清空队列并跳转登录
          pendingRequests.length = 0;
          throw error;
        })
        .finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });

      // 当前请求加入队列，等刷新完成后重试
      return new Promise<T>((resolve, reject) => {
        pendingRequests.push(async () => {
          try {
            const result = await performRequest<T>(method, url, body, options);
            resolve(result);
          } catch (err) {
            reject(err);
          }
        });
      });
    }

    const result = await responseInterceptor(response, isStreaming);
    showLoading(false);
    return result;
  } catch (error: unknown) {
    showLoading(false);

    if (error || handleError) {
      message.error(error instanceof Error ? error.message : (error as string));
    }

    throw error;
  }
};

// 导出 http 工具
export const http = {
  get: <T = unknown>(
    url: string,
    params?: Record<string, unknown>,
    options: FetchOptions = {}
  ) => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : '';
    return performRequest<T>('GET', `${url}${queryString}`, null, options);
  },

  post: <T = unknown>(
    url: string,
    body?: unknown,
    options: FetchOptions = {}
  ) => performRequest<T>('POST', url, body, options),

  put: <T = unknown>(url: string, body?: unknown, options: FetchOptions = {}) =>
    performRequest<T>('PUT', url, body, options),

  delete: <T = unknown>(url: string, options: FetchOptions = {}) =>
    performRequest<T>('DELETE', url, null, options)
};
