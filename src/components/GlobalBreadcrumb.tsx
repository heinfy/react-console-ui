import useEmotionCss from '@/hooks/useEmotionCss';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import classNames from 'classnames';
import React from 'react';


const GlobalBreadcrumb: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const breadcrumbClassName = useEmotionCss(() => {
    return {
      marginBlockEnd: '16px'
    };
  });
  const breadcrumbMobileClassName = useEmotionCss(() => {
    return {
      marginBlockEnd: '8x'

    };
  });

  return (
    <Breadcrumb
      className={classNames(breadcrumbClassName, { [breadcrumbMobileClassName]: isMobile })}
      params={{ id: 1 }}
      items={[
        {
          href: '/',
          title: <HomeOutlined />,
        },
        {
          title: <a href="">Application Center</a>,
        },
        {
          title: <a href="">Application List</a>,
        },
        {
          title: 'An Application',
        },
        {
          title: ':id',
        },
      ]}
    />
  );
};

export default GlobalBreadcrumb;