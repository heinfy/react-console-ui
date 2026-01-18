import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/user/userSlice';
import { Layout, Menu } from 'antd';
import React, { useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { DefaultFooter as Footer } from '@/components/Footer';
import { DefaultHeader as Header } from '@/components/Header';
import { LayoutBg } from '@/components/LayoutBg';
import { SiderDrawer } from '@/components/SiderDrawer';
import { SiderMenu } from '@/components/SiderMenu';
import { generateRoutes } from '@/utils/route';

import { defaultVar } from '@/config/index';
import { useBreakpoint } from '@/hooks/useMediaQuery';

import type { PageHeaderProps } from '@/components/Header';
import type { SiderDrawerProps } from '@/components/SiderDrawer';
import type { SiderMenuProps } from '@/components/SiderMenu';
import type { UserInfo } from '@/types/self';
import type { MenuProps } from 'antd';
import classNames from 'classnames';
import GlobalBreadcrumb from './GlobalBreadcrumb';

const { Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const PageLayout: React.FC = () => {
  const { collapsedWidth, siderWidth } = defaultVar;
  const colSize = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['/']);
  const isMobile = useMemo(() => {
    const isM = colSize === 'sm' || colSize === 'xs';
    if (isM) setCollapsed(true);
    if (colSize === 'md') setCollapsed(true);
    else setCollapsed(false);
    return isM;
  }, [colSize]);
  const { userInfo } = useAppSelector(selectUser) as { userInfo: UserInfo };
  const permissions = userInfo.permissions
    .filter(perm => perm.name.indexOf('menu:') == 0)
    .map(perm => perm.name);
  const menuTree = useMemo(() => {
    if (permissions.length == 0) return [];
    return generateRoutes(permissions);
  }, [permissions]);

  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    const redirectPath = new URL(window.location.href).pathname;
    const path = redirectPath || location.pathname;
    const match = path.match(/^(.*?)\/\d/);
    const result = match ? match[1] : path;
    const paths = result.split('/').filter(Boolean).slice(0, -1);
    const openKeys = paths.reduce((acc, path, index) => {
      return (
        acc.push(index == 0 ? `/${path}` : `${acc[acc.length - 1]}/${path}`),
        acc
      );
    }, [] as string[]);
    setOpenKeys(openKeys);
    setSelectedKeys([result]);
    if (redirectPath !== location.pathname) {
      navigate(redirectPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    setOpenKeys(openKeys.length === 0 ? [] : openKeys);
  }
  const getRoute = ({ key }: { key: string }) => {
    navigate(key);
  };

  const siderMenuProps: SiderMenuProps = {
    isMobile,
    siderWidth,
    collapsed,
    setCollapsed: (collapse: boolean) => {
      if (isMobile) return;
      setCollapsed?.(collapse);
    },
    collapsedWidth,
    children: (
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <Menu
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          mode="inline"
          items={menuTree as unknown as MenuItem[]}
          onClick={getRoute}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            width: '100%'
          }}
        />
      </div>
    )
  };
  const siderDrawerProps: SiderDrawerProps = {
    siderWidth,
    collapsed,
    setCollapsed: (collapse: boolean) => {
      setCollapsed?.(collapse);
    },
    children: <SiderMenu {...siderMenuProps} />
  };
  // 顶部栏
  const pageHeaderProps: PageHeaderProps = {
    isMobile,
    collapsed,
    setCollapsed: (collapse: boolean) => {
      setCollapsed?.(collapse);
    }
  };

  return (
    <div
      className={classNames({
        [`screen-${colSize}`]: colSize,
        isMobile: isMobile
      })}
    >
      <LayoutBg />
      <Layout>
        {/* 侧边栏 */}
        {isMobile ? (
          <SiderDrawer {...siderDrawerProps} />
        ) : (
          <>
            <div
              style={{
                width: collapsed ? collapsedWidth : siderWidth,
                overflow: 'hidden',
                flex: `0 0 ${collapsed ? collapsedWidth : siderWidth}px`,
                maxWidth: collapsed ? collapsedWidth : siderWidth,
                minWidth: collapsed ? collapsedWidth : siderWidth,
                transition: 'all 0.2s ease 0s'
              }}
            />
            <SiderMenu {...siderMenuProps} />
          </>
        )}
        <Layout style={{ position: 'relative' }}>
          {/* 顶部 */}
          <Header {...pageHeaderProps} />
          {/* 内容 */}
          <Content
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 56px - 108px)'
            }}
          >
            <GlobalBreadcrumb isMobile={isMobile} />
            <Outlet />
          </Content>
          {/* 底部 */}
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default PageLayout;
