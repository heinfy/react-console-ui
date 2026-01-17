import type { Res } from '@/types/common';
import type { UserInfo } from '@/types/self';
import { http } from '@/utils/http';
import { API_VERSION } from './constant';

/**
 * 获取当前登录用户的信息
 */
export const getCurrentUser = (): Res<UserInfo> =>
  http.get(`${API_VERSION}/self/current`);

interface updateCurrentUserBody {
  name: string;
  description: string;
}

/**
 * 更新当前登录用户的名称和描述
 * @param {Object} body - 登录参数 Object
 * @param {string} body.email - 邮箱
 * @param {string} body.password - 密码
 */
export const updateCurrentUser = (body: updateCurrentUserBody): Res =>
  http.put(`${API_VERSION}/self/update-current`, body);
