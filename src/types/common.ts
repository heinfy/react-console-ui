// 定义通用响应类型
export type Res<T = unknown> = Promise<T>;

export type UserIdType = string | number;

export type RoleIdType = string | number;

export type PermissionIdType = string | number;

export interface PageBaseParams {
  page: number;
  pageSize: number;
}
