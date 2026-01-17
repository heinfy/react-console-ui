import { menuData } from '@/config';
import type { RouteItem } from '@/config/menu';
import i18n from '@/i18n';
import { default as IconRenderer } from './IconRenderer';

export const generateRoutes = (permissions: string[]) => {
  let menuList = JSON.parse(JSON.stringify(menuData)) as RouteItem[];
  // 检查是否有菜单权限
  if (permissions.indexOf('menu:*') === -1) {
    // 过滤出有权限的菜单项
    menuList = menuData.filter(item => {
      if (!item.permission) return true; // 没有权限要求的菜单项默认显示

      if (Array.isArray(item.permission)) {
        return item.permission.some(perm => permissions.includes(perm));
      } else {
        return permissions.includes(item.permission);
      }
    });
  }

  const routeMap: { [key: string]: RouteItem } = {};
  for (const item of menuList) {
    if (item) {
      item.icon = IconRenderer(item.icon as string);
      // 修复：先检查 item.label 是否为对象类型
      if (typeof item.label === 'object' && item.label !== null) {
        item.label =
          item.label[(i18n.language as string) || 'zh-CN'] ||
          item.label['zh-CN'];
      }
      // 如果 item.label 是字符串，则保持不变
      routeMap[item.id] = item;
    }
  }
  return menuList.filter(item => {
    if (routeMap[item.pid]) {
      if (routeMap[item.pid].children) {
        (routeMap[item.pid].children as RouteItem[]).push(item);
      } else {
        routeMap[item.pid].children = [item];
      }
    }
    return !item.pid;
  });
};
