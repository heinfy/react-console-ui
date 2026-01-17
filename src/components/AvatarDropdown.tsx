import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Dropdown, message, Spin } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { logout } from '@/api/auth';
import useEmotionCss from '@/hooks/useEmotionCss';
import { useAppSelector } from '@/store/hooks';
import { removeToken, } from '@/utils/storage';
import { useTranslation } from 'react-i18next';

export const AvatarDropdown: React.FC<{
  children?: React.ReactNode;
}> = ({
  children
}) => {
    const userInfo = useAppSelector(state => state.user.userInfo)
    const { t } = useTranslation();
    const dropdownClassName = useEmotionCss(({ token }) => {
      return {
        [`@media screen and (max-width: ${token.screenXS}px)`]: {
          width: '100%'
        }
      };
    });

    /**
     * 退出登录，并且将当前的 url 保存
     */
    const loginOut = () => {
      logout().then(() => {
        message.success(t('layout.header.logout.success'));
        setTimeout(() => {
          removeToken();
          window.location.href = '/login';
        }, 300);
      }).catch((err) => {
        message.error(err.detail);
      });
    };


    const onMenuClick = (event: any) => {
      const { key } = event;
      console.log('key', key);
      if (key === 'logout') {
        loginOut();
        return;
      }
    }


    const actionClassName = useEmotionCss(({ token }) => {
      return {
        display: 'flex',
        height: '48px',
        marginLeft: 'auto',
        overflow: 'hidden',
        alignItems: 'center',
        padding: '0 8px',
        cursor: 'pointer',
        borderRadius: token.borderRadius,
        '&:hover': {
          backgroundColor: token.colorBgTextHover
        }
      };
    });

    if (!userInfo || !userInfo.name) {
      return <span className={actionClassName}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8
          }}
        />
      </span>;
    }


    return (
      <Dropdown
        className={classNames(dropdownClassName)}
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: [
            {
              key: 'center',
              icon: <UserOutlined />,
              label: t('layout.header.user.center')
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: t('layout.header.user.setting')
            },
            {
              type: 'divider' as const
            },
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: t('layout.header.user.logout')
            }
          ]
        }}
      >
        {children}
      </Dropdown>
    );
  };
