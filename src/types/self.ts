export interface Role {
  id: number;
  name: string;
  display_name: string;
}

export interface PermissionIdType {
  id: number;
  name: string;
  display_name: string;
}

export type UserInfo = {
  id: number;
  name: string;
  email: string;
  description: string;
  is_active: boolean;
  is_deletable: boolean;
  is_editable: boolean;
  roles: Role[];
  permissions: PermissionIdType[];
};
