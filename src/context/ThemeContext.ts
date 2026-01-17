import { theme } from 'antd';
import { createContext } from 'react';
const { defaultAlgorithm, darkAlgorithm } = theme;

export const lightTheme = {
  mode: 'light',
  algorithm: defaultAlgorithm
};

export const darkTheme = {
  mode: 'dark',
  algorithm: darkAlgorithm
};

export type ThemeConfig = typeof lightTheme | typeof darkTheme;
export type ThemeMode = ThemeConfig['mode'];
export type ThemeAlgorithm = ThemeConfig['algorithm'];

export const ThemeContext = createContext<{
  defaultTheme: ThemeConfig;
  updateDefaultTheme: (theme: ThemeConfig) => void;
}>({
  defaultTheme: lightTheme,
  updateDefaultTheme: () => {}
});
