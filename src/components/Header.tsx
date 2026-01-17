import useEmotionCss from '@/hooks/useEmotionCss';
import { useAppSelector } from '@/store/hooks';
import type { UserInfo } from '@/types/self';
import { MenuFoldOutlined, MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { Avatar, Button, Layout } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React, { useMemo, useState } from 'react';
import AppsLogo from './AppsLogo';
import { AvatarDropdown } from './AvatarDropdown';
import Question from './Question';
import SelectLang from './SelectLang';
import ThemeBtn from './ThemeBtn';

export interface PageHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
}

const { Header } = Layout;

const DefaultHeader: React.FC<PageHeaderProps> = props => {
  const {
    isMobile,
    collapsed,
    setCollapsed,
  } = props;
  const userInfo = useAppSelector(state => state.user.userInfo) as UserInfo;
  const { name } = userInfo;
  const [rightSize, setRightSize] = useState<number | string>('auto');
  const setRightSizeDebounceFn = useDebounceFn(async (width: number) => {
    setRightSize(width);
  }, {
    wait: 160,
  });

  const headerClassName = useEmotionCss(({ token }) => {
    return {
      height: 56,
      lineHeight: 56,
      zIndex: 19,
      width: '100%',
      paddingBlock: 0,
      paddingInline: 0,
      borderBlockEnd: `1px solid ${token.colorSplit}`,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      WebkitBackdropFilter: 'blur(8px)',
      backdropFilter: 'blur(8px)',
      transition:
        'background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
      '&-fixed-header': {
        position: 'fixed',
        insetBlockStart: 0,
        width: '100%',
        zIndex: 100,
        insetInlineEnd: 0
      },
      '&-header-actions': {
        display: 'flex',
        alignItems: 'center',
        fontSize: '16',
        cursor: 'pointer',
        '& &-item': {
          paddingBlock: 0,
          paddingInline: 8,
          '&:hover': {
            color: token.colorText
          }
        }
      }
    };
  });

  const globalClassName = useEmotionCss(({ token }) => {
    return {
      position: 'relative',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      marginBlock: 0,
      marginInline: 16,
      height: 56,
      boxSizing: 'border-box',
      '> a': {
        height: '100%'
      },
      '&-collapsed-button': {
        minHeight: '22px',
        fontSize: '18px',
        marginInlineEnd: '16px'
      },
      '&-logo': {
        position: 'relative',
        marginInlineEnd: '16px',
        span: {
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          minHeight: '22px',
          fontSize: '20px'
        },
        img: { height: '28px' },
        h1: {
          height: '32px',
          marginBlock: 0,
          marginInline: 0,
          marginInlineStart: 8,
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '32px'
        }
      },
      '&-middle': {
        flex: '1 1 auto',
        height: 56,
        lineHeight: '56px',
        marginInlineEnd: 16,
        marginInlineStart: 0,
        display: 'flex',
        alignItems: 'center',
      },
      '&-actions': {
        display: 'flex',
        height: '100%',
        '&-item': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBlock: 0,
          paddingInline: 2,
          color: token.colorText,
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: token.borderRadius,

          '> *': {
            paddingInline: 6,
            paddingBlock: 6,
            borderRadius: token.borderRadius,
            '&:hover': {
              backgroundColor: token.colorBgTextHover
            }
          }
        },
        '&-avatar': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingInlineStart: token.padding,
          paddingInlineEnd: token.padding,
          cursor: 'pointer',
          color: token.colorText,
          '> div': {
            height: '44px',
            color: token.colorText,
            paddingInline: 8,
            paddingBlock: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            lineHeight: '44px',
            borderRadius: token.borderRadius,
            '&:hover': {
              backgroundColor: token.colorBgTextHover
            }
          }
        }
      }
    };
  });

  const avatarDom = useMemo(() => {
    return (
      <div>
        <Avatar
          size={28}
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        />
        <span
          style={{
            marginInlineStart: 8
          }}
        >
          {name}
        </span>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsed, name]);


  return <>
    <Header
      style={{
        height: 56,
        lineHeight: 56,
        backgroundColor: 'transparent',
        zIndex: 19
      }}
    />
    <Header className={classNames(headerClassName, `${headerClassName}-fixed-header`, {
      [`${headerClassName}-fixed-header-action`]: !collapsed,
    })}>
      <div className={globalClassName}>
        {isMobile && <>
          <span
            className={`${globalClassName}-collapsed-button`}
            onClick={() => {
              setCollapsed?.(!collapsed);
            }}
          >
            <MenuOutlined />
          </span>
          <AppsLogo />
        </>}
        {!isMobile && (
          <div className={`${globalClassName}-logo`}>
            <span key="title">
              <AppsLogo />
              <h1>Console</h1>
            </span>
          </div>
        )}
        <div className={`${globalClassName}-middle`}>
          {!isMobile && <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              paddingInline: 6,
            }}
          />}
          {/* 中间区域，可放置搜索框等内容 */}
        </div>
        <div
          className={`${globalClassName}-right-content`}
          style={{
            minWidth: rightSize,
            height: '100%'
          }}
        >
          <div
            style={{
              height: '100%'
            }}
          >
            <ResizeObserver
              onResize={({ width }: { width: number }) => {
                setRightSizeDebounceFn.run(width);
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end'
                }}
              >
                <div className={`${globalClassName}-actions`}>
                  {[<Question />, <SelectLang />, <ThemeBtn />].map((dom, index) => {
                    return (
                      <div
                        key={index}
                        className={classNames(`${globalClassName}-actions-item`)}
                      >
                        {dom}
                      </div>
                    );
                  })}
                  <span className={`${globalClassName}-actions-avatar`}>
                    <AvatarDropdown children={avatarDom} />
                  </span>
                </div>
              </div>
            </ResizeObserver>
          </div>
        </div>
      </div>
    </Header>
  </>;
};
export { DefaultHeader };
