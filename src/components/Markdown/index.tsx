import useEmotionCss from '@/hooks/useEmotionCss';
import classnames from 'classnames';
import React, { useMemo } from 'react';
import markdownIt from './markdown';

interface MarkdownContentProps {
  content?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content = ''
}) => {
  const mdClassName = useEmotionCss(({ token }) => {
    console.log('token', token);
    return {
      color: token.colorText,
      backgroundColor: token.colorBgContainer,
      lineHeight: token.lineHeight,
      fontSize: token.fontSize,
      padding: token.padding,

      // 标题样式
      h1: {
        fontSize: token.fontSizeHeading1,
        marginTop: token.marginXXL,
        marginBottom: token.margin,
        color: token.colorTextHeading,
        fontWeight: 600,
      },

      h2: {
        fontSize: token.fontSizeHeading2,
        marginTop: token.marginXL,
        marginBottom: token.margin,
        color: token.colorTextHeading,
        fontWeight: 600,
      },

      h3: {
        fontSize: token.fontSizeHeading3,
        marginTop: token.marginLG,
        marginBottom: token.marginSM,
        color: token.colorTextHeading,
        fontWeight: 600,
      },

      h4: {
        fontSize: token.fontSizeHeading4,
        marginTop: token.marginMD,
        marginBottom: token.marginSM,
        color: token.colorTextHeading,
        fontWeight: 600,
      },

      // 段落样式
      p: {
        marginBottom: token.margin,
        lineHeight: token.lineHeightLG,
      },

      // 链接样式
      a: {
        color: token.colorPrimary,
        textDecoration: token.wireframe ? 'dashed' : 'underline',
        '&:hover': {
          color: token.colorPrimaryHover,
        },
      },

      // 引用块样式
      blockquote: {
        borderLeft: `${token.lineWidthBold}px solid ${token.colorBorder}`,
        padding: token.padding,
        margin: `${token.margin}px 0`,
        color: token.colorTextDescription,
        backgroundColor: token.colorFillTertiary,
        p: {
          margin: 0,
        }
      },

      // 列表样式
      ul: {
        margin: `${token.margin}px 0`,
        paddingLeft: token.paddingLG,
        li: {
          marginBottom: token.marginXS,
        },
      },

      ol: {
        margin: `${token.margin}px 0`,
        paddingLeft: token.paddingLG,
        li: {
          marginBottom: token.marginXS,
        },
      },

      // 代码块样式
      pre: {
        backgroundColor: token.colorFillQuaternary,
        borderRadius: token.borderRadius,
        padding: `${token.paddingSM}px ${token.padding}px`,
        overflow: 'auto',
        border: `1px solid ${token.colorBorder}`,
        code: {
          backgroundColor: 'transparent',
          border: 'none',
          padding: 0,
          color: token.colorTextSecondary,
          fontFamily: token.fontFamilyCode,
        },
      },

      code: {
        fontFamily: token.fontFamilyCode,
        backgroundColor: token.colorFillTertiary,
        borderRadius: token.borderRadiusSM,
        padding: `${token.paddingXS - 2}px ${token.paddingSM}px`,
        color: token.colorTextSecondary,
      },

      // 表格样式
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        margin: `${token.margin}px 0`,
      },

      th: {
        border: `1px solid ${token.colorBorder}`,
        padding: `${token.paddingXS}px ${token.paddingSM}px`,
        textAlign: 'left',
        backgroundColor: token.colorFillSecondary,
        fontWeight: 600,
      },

      td: {
        border: `1px solid ${token.colorBorder}`,
        padding: `${token.paddingXS}px ${token.paddingSM}px`,
        textAlign: 'left',
      },

      // 水平分割线
      hr: {
        border: 'none',
        borderTop: `1px solid ${token.colorBorder}`,
        margin: `${token.marginLG}px 0`,
      },

      // 强调文本
      strong: {
        fontWeight: 600,
        color: token.colorTextHeading,
      },

      em: {
        color: token.colorTextDescription,
        fontStyle: 'italic',
      },
    }
  });

  // 将 Markdown 转为 HTML
  const renderedHTML = useMemo(() => {
    if (!content) return { __html: '' };
    return { __html: markdownIt.render(content) };
  }, [content]);

  return (
    <div
      className={classnames(mdClassName)}
      dangerouslySetInnerHTML={renderedHTML}
    />
  );
};

export default MarkdownContent;