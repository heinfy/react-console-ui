import useEmotionCss from '@/hooks/useEmotionCss';
import { Keyframes } from '@ant-design/cssinjs';
import { EditOutlined, GithubOutlined, LinkOutlined, ShopOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import React from 'react';

const proLayoutTitleHide = new Keyframes('antBadgeLoadingCircle', {
  '0%': { display: 'none', opacity: 0, overflow: 'hidden' },
  '80%': {
    overflow: 'hidden'
  },
  '100%': {
    display: 'unset',
    opacity: 1
  }
});

export type SiderMenuProps = {
  siderWidth?: number;
  isMobile?: boolean;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  collapsedWidth: number;
  children?: React.ReactNode;
};

const { Sider } = Layout;

export const SiderMenu: React.FC<SiderMenuProps> = ({
  siderWidth,
  isMobile,
  collapsed,
  collapsedWidth,
  setCollapsed,
  children
}) => {

  const siderMenuCss = useEmotionCss(({ token }) => {
    return {
      boxSizing: 'border-box',
      background: 'transparent',
      position: 'fixed',
      insetInlineStart: 0,
      zIndex: '100',
      height: `calc(100% - ${56}px)`,
      insetBlockStart: `${56}px`,
      [`.ant-layout-sider-children`]: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingInline: '8px',
        paddingBlock: 0,
        borderInlineEnd: `1px solid ${token.colorSplit}`,
        marginInlineEnd: -1
      },
    };
  });
  const siderLink = useEmotionCss(() => ({
    width: '100%',
    ul: {
      height: 'auto'
    },
    '&-link-menu': {
      border: 'none',
      boxShadow: 'none',
      background: 'transparent'
    },
  }));
  const siderFooter = useEmotionCss(({ token }) => ({
    color: token.colorText,
    paddingBlockEnd: 6,
    fontSize: token.fontSize,
    animationName: proLayoutTitleHide,
    animationDuration: '.4s',
    animationTimingFunction: 'ease'
  }));

  const getMenuKey = ({ key }: { key: string }) => {
    console.log('MenuKey', key);
  };

  return <Sider
    width={siderWidth}
    trigger={null}
    collapsible
    collapsed={isMobile ? false : collapsed}
    onCollapse={collapse => {
      if (isMobile) return;
      setCollapsed?.(collapse);
    }}
    style={{ background: 'transparent' }}
    collapsedWidth={collapsedWidth}
    className={classNames({
      [`${siderMenuCss}`]: !isMobile,
      [`${siderMenuCss}-fixed`]: !isMobile
    })}
  >
    {children}
    <div className={`${siderLink}`}>
      <Menu
        className={`${siderLink}-link-menu`}
        mode="inline"
        onClick={getMenuKey}
        items={[
          {
            label: 'User Profile',
            key: 'myself',
            icon: <EditOutlined />
          },
          {
            label: 'Code Repo',
            key: 'SubMenu',
            icon: <ShopOutlined />,
            children: [
              {
                label: (
                  <a
                    href="https://github.com/heinfy/react-console-ui"
                    target="_blank"
                  >
                    Console React
                  </a>
                ),
                icon: <GithubOutlined />,
                key: 'react-console-ui'
              },
              {
                label: (
                  <a
                    href="https://github.com/heinfy/console_server"
                    target="_blank"
                  >
                    Console Server
                  </a>
                ),
                icon: <GithubOutlined />,
                key: 'console_server'
              },
            ]
          },
          {

            label: (
              <a
                href="https://blog.heinfy.top/"
                target="_blank"
              >
                Blog
              </a>
            ),
            icon: <LinkOutlined />,
            key: 'blog'
          },
        ]}
      />
    </div>
    <div className={classNames(siderFooter)}>
      {
        collapsed ? null : <p
          style={{
            textAlign: 'center',
            paddingBlockStart: 12
          }}
        >
          Power by Heinfy
        </p>
      }
    </div>
  </Sider>

};
