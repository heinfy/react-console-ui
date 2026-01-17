import type { LoginBody, registerBody } from '@/types/auth';
import type { Res } from '@/types/common';
import { http } from '@/utils/http';

/**
 * 注册
 * @param {Object} body - 注册参数 Object
 * @param {string} body.name - 用户名
 * @param {string} body.email - 邮箱
 * @param {string} body.password - 密码
 */
export const register = (body: registerBody): Res =>
  http.post('/auth/register', body);

/**
 * 登录
 * @param {Object} body - 登录参数 Object
 * @param {string} body.email - 邮箱
 * @param {string} body.password - 密码
 */
export const login = (
  body: LoginBody
): Res<{ access_token: string; token_type: string }> =>
  http.post('/auth/login', body);

/**
 * 登出
 */
export const logout = (): Res => http.get('/auth/logout');
