import { css } from '@emotion/css';
import type { CSSInterpolation } from '@emotion/serialize';
import { theme } from 'antd';

type Theme = ReturnType<typeof theme.useToken>;

type cssFunction = (token: Theme) => CSSInterpolation | Array<CSSInterpolation>;

const useEmotionCss = function useEmotionCss(cssFn: cssFunction) {
  const token = theme.useToken();
  return css(cssFn(token));
};

export default useEmotionCss;
