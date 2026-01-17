import { Drawer } from 'antd';
import React from 'react';

export type SiderDrawerProps = {
  siderWidth?: number;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  children?: React.ReactNode;
};

export const SiderDrawer: React.FC<SiderDrawerProps> = props => {
  const {
    siderWidth,
    collapsed,
    setCollapsed,
    children
  } = props;
  return (
    <Drawer
      placement="left"
      onClose={() => {
        setCollapsed?.(!collapsed);
      }}
      open={collapsed}
      maskClosable
      closable={false}
      size={siderWidth}
      styles={{
        body: {
          height: '100vh',
          padding: 0,
          display: 'flex',
          flexDirection: 'row'
        }
      }}
    >
      {children}
    </Drawer>
  );
};
