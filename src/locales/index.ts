import { getStorage } from '@/utils/storage';
import enUSLocal from './en-US';
import zhLocal from './zh-CN';

export const defaultLocale = 'zh-CN';
export const enUS = 'en-US';

export const localeMap: { [key: string]: string } = {
  [defaultLocale]: defaultLocale,
  [enUS]: enUS
};

export const locales = {
  [localeMap[defaultLocale]]: zhLocal,
  [localeMap[enUS]]: enUSLocal
};

export type LocaleType = keyof typeof localeMap;

export const getLanguage = (): string => {
  const lang = getStorage('locale') || navigator.language || defaultLocale;
  return lang;
};
