import type { JSX } from 'react';

export default [
  {
    id: 11,
    pid: 0,
    permission: 'menu:home',
    label: {
      'zh-CN': '首页',
      'en-US': 'Home'
    },
    key: '/',
    icon: 'HomeOutlined'
  },
  {
    id: 1,
    pid: 0,
    permission: 'menu:dashboard',
    label: {
      'zh-CN': '仪表盘',
      'en-US': 'Dashboard'
    },
    key: '/dashboard',
    icon: 'PieChartOutlined'
  },
  {
    id: 2,
    pid: 0,
    permission: 'menu:chart',
    label: {
      'zh-CN': '图表',
      'en-US': 'Chart'
    },
    key: '/chart',
    icon: 'DesktopOutlined'
  },
  {
    id: 3,
    pid: 0,
    permission: ['menu:user', 'menu:permission', 'menu:role'],
    label: {
      'zh-CN': 'RBAC管理',
      'en-US': 'RBAC'
    },
    key: '/admin',
    icon: 'TeamOutlined'
  },
  {
    id: 31,
    pid: 3,
    permission: 'menu:user',
    label: {
      'zh-CN': '用户管理',
      'en-US': 'User'
    },
    key: '/admin/user',
    icon: 'UserOutlined'
  },
  {
    id: 32,
    pid: 3,
    permission: 'menu:permission',
    label: {
      'zh-CN': '权限管理',
      'en-US': 'Permission'
    },
    key: '/admin/permission',
    icon: 'OneToOneOutlined'
  },
  {
    id: 33,
    pid: 3,
    permission: 'menu:role',
    label: {
      'zh-CN': '角色管理',
      'en-US': 'Role'
    },
    key: '/admin/role',
    icon: 'ClusterOutlined'
  },
  {
    id: 5,
    pid: 0,
    permission: 'menu:setting',
    label: {
      'zh-CN': '系统设置',
      'en-US': 'Setting'
    },
    key: '/setting',
    icon: 'SettingOutlined'
  }
] as const as RouteItem[];

export type RouteItem = {
  id: number;
  key: string;
  pid: number;
  permission: string | string[];
  label:
    | {
        'zh-CN': string;
        'en-US': string;
        [key: string]: string;
      }
    | string;
  icon: string | Element | JSX.Element;
  children?: RouteItem[];
};
