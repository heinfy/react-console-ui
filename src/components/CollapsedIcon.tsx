import useEmotionCss from '@/hooks/useEmotionCss';
import classNames from 'classnames';
interface CollapsedIconProps {
  isMobile?: boolean;
  collapsed?: boolean;
  className?: string;
}

export const CollapsedIcon: React.FC<CollapsedIconProps> = props => {
  const { isMobile, collapsed, className, ...rest } = props;

  const collapsedButton = useEmotionCss(({ token }) => ({
    position: 'absolute',
    insetBlockStart: '18px',
    zIndex: '101',
    width: '24px',
    height: '24px',
    fontSize: '14px',
    textAlign: 'center',
    borderRadius: '40px',
    insetInlineEnd: '-13px',
    transition: 'transform 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: token.colorTextSecondary,
    backgroundColor: token.colorBgLayout,
    boxShadow:
      '0 2px 8px -2px rgba(0,0,0,0.05), 0 1px 4px -1px rgba(25,15,15,0.07), 0 0 1px 0 rgba(0,0,0,0.08)',
    '&:hover': {
      color: token.colorText,
      boxShadow:
        '0 4px 16px -4px rgba(0,0,0,0.05), 0 2px 8px -2px rgba(25,15,15,0.07), 0 1px 2px 0 rgba(0,0,0,0.08)'
    },
    '& > svg': {
      transition: 'transform  0.3s',
      transform: 'rotate(90deg)'
    },
    '&-collapsed': {
      '& > svg': {
        transform: 'rotate(-90deg)'
      }
    }
  }));

  return <div {...rest} className={classNames(
    collapsedButton,
    {
      [`${className}-collapsed`]: isMobile ? !collapsed : collapsed,
      [`${className}-is-mobile`]: isMobile
    })}
  >
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.432 7.967a.448.448 0 01-.318.133h-.228a.46.46 0 01-.318-.133L2.488 4.85a.305.305 0 010-.43l.427-.43a.293.293 0 01.42 0L6 6.687l2.665-2.699a.299.299 0 01.426 0l.42.431a.305.305 0 010 .43L6.432 7.967z" />
    </svg>
  </div>
};
