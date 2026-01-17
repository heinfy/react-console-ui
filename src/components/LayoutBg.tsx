import useEmotionCss from '@/hooks/useEmotionCss';

type BgLayoutImgType = {
  src?: string;
  width?: string;
  height?: string;
  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
};

const bgLayoutImgList: BgLayoutImgType[] = [
  {
    src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
    left: 85,
    bottom: 100,
    height: '303px'
  },
  {
    src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
    bottom: -68,
    right: -45,
    height: '303px'
  },
  {
    src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
    bottom: 0,
    left: 0,
    width: '331px'
  }
];

export const LayoutBg = () => {
  const collapsedIconClassName = useEmotionCss(
    ({ token: { colorBgLayout } }) => {
      return {
        pointerEvents: 'none',
        position: 'fixed',
        overflow: 'hidden',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 0,
        height: '100%',
        width: '100%',
        background: colorBgLayout
      };
    }
  );
  return (
    <div className={`${collapsedIconClassName}`}>
      {bgLayoutImgList.map((item, index) => (
        <img
          key={index}
          src={item.src}
          style={{
            position: 'absolute',
            ...item
          }}
          alt={`bg${index}`}
        />
      ))}
    </div>
  );
};