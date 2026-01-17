import * as Icons from '@ant-design/icons';
import { AntDesignOutlined } from '@ant-design/icons';
import React from 'react';

const IconRenderer = (iconName: string) => {
  const Icon = Icons[iconName as keyof typeof Icons];
  if (!Icon) return <AntDesignOutlined />;
  return React.createElement(Icon as React.FC);
};

export default IconRenderer;
