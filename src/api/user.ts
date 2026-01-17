import type {
  PageBaseParams,
  Res,
  RoleIdType,
  UserIdType
} from '@/types/common';
import { http } from '@/utils/http';
import { API_VERSION } from './constant';

interface UserDisableBody {
  is_active: boolean;
}
/**
 * 禁用某个用户
 */
export const disableUserByUserId = (
  user_id: UserIdType,
  body: UserDisableBody
): Res => http.put(`${API_VERSION}/user/${user_id}/disable`, body);

/**
 * 根据角色ID列表为特定用户分配角色权限。
 */
export const assignRolesByUserId = (
  user_id: UserIdType,
  body: {
    role_ids: UserIdType[];
  }
): Res => http.post(`${API_VERSION}/user/${user_id}/assign-roles`, body);

/**
 * 获取某个用户的角色列表
 */
export const getRoleListByUserId = (user_id: UserIdType): Res =>
  http.get(`${API_VERSION}/user/${user_id}/roles`);

/**
 * 批量删除某个用户的角色
 */
export const batchDeleteRolesByUserId = (
  user_id: UserIdType,
  role_ids: RoleIdType[]
): Res =>
  http.post(`${API_VERSION}/user/${user_id}/remove-roles`, {
    body: { role_ids }
  });

/**
 * 获取用户列表（需要登录，支持分页）
 */
export const getUserList = (params: PageBaseParams): Res =>
  http.get(`${API_VERSION}/user/list`, { ...params });

/**
 * 获取某个用户的权限列表（需要登录）
 */
export const getPermissionListByUserId = (user_id: UserIdType): Res =>
  http.get(`${API_VERSION}/user/${user_id}/permissions`);
