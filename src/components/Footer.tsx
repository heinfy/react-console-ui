import useEmotionCss from "@/hooks/useEmotionCss";
import { CopyrightOutlined, GithubOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const { Footer } = Layout;

export const DefaultFooter = () => {
  const { t } = useTranslation();

  const links = [
    {
      key: 'Ant Design',
      title: 'Ant Design',
      href: 'https://ant-design.antgroup.com/index-cn',
      blankTarget: true
    },
    {
      key: 'github',
      title: <GithubOutlined />,
      href: 'https://github.com/heinfy',
      blankTarget: true
    },
  ];

  const listClassName = useEmotionCss(({ token }) => ({
    marginBlockEnd: 8,
    color: token.colorTextSecondary,
    '&-link': {
      color: token.colorTextSecondary,
      textDecoration: token.linkDecoration
    },
    '*:not(:last-child)': {
      marginInlineEnd: 8
    },
    '&:hover': {
      color: token.colorPrimary
    }
  }));

  const copyrightClassName = useEmotionCss(({ token }) => ({ color: token.colorText }));

  return (
    <Footer className='p-0 bg-none'>
      <div className="mt-2 mb-2 px-4 py-0 text-center bg-none">
        {links.length > 0 && (
          <div className={listClassName}>
            {links.map(link => (
              <a
                key={link.key}
                title={link.key}
                target={link.blankTarget ? '_blank' : '_self'}
                href={link.href}
                rel="noreferrer"
              >
                {link.title}
              </a>
            ))}
          </div>
        )}
        <div className={classNames(copyrightClassName, 'text-sm')}>
          <CopyrightOutlined /> {new Date().getFullYear()}{' '}
          {t('app.copyright.produced')}
        </div>
      </div>
    </Footer>
  );
};
