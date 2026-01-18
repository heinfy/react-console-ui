import { menuData } from '@/config';
import useEmotionCss from '@/hooks/useEmotionCss';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, type BreadcrumbProps } from 'antd';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const GlobalBreadcrumb: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const { pathname } = location;
  const paths = pathname.split('/').filter(Boolean);

  const breadcrumbItems = useMemo(() => {
    const items: BreadcrumbProps['items'] = []

    if (paths.length == 0) return items

    items.push({
      key: 'home',
      title: <a href="/"><HomeOutlined /></a>,
    });

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      if (path === '') continue;
      const isLast = i === paths.length - 1;
      // 是否是动态路由
      const isDynamic = !isNaN(Number(path))
      const matchPath = `/${paths.slice(0, i + 1).join('/')}`;
      if (isDynamic) {
        items.push({
          key: path,
          title: isLast ? path : <a href={matchPath}>{path}</a>,
        });
      } else {
        const route = menuData.find((item) => item.key === matchPath);
        if (route) {
          let title = route?.label;
          if (!title) continue;
          if (typeof title === 'object' && title !== null) {
            title = title[i18n.language || 'zh-CN']
          }
          items.push({
            key: route.key,
            title: isLast ? title as string : <a href={route.key}>{title as string}</a>,
          });
        }

      }
    }

    return items
  }, [paths, i18n.language]);

  const breadcrumbClassName = useEmotionCss(() => ({
    marginBlockEnd: '16px'
  }));

  const breadcrumbMobileClassName = useEmotionCss(() => ({
    marginBlockEnd: '8px'
  }));

  return breadcrumbItems.length > 0 ?
    <Breadcrumb
      className={classNames(breadcrumbClassName, { [breadcrumbMobileClassName]: isMobile })}
      items={breadcrumbItems}
    /> : null
};

export default GlobalBreadcrumb;