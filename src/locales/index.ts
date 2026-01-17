import { getStorage } from '@/utils/storage';
import enUSLocal from './en-US';
import zhLocal from './zh-CN';

export const locales = {
  'zh-CN': zhLocal,
  'en-US': enUSLocal
};

export type LocaleType = keyof typeof locales;

export const getLanguage = (): string => {
  const lang = getStorage('locale') || navigator.language || 'zh-CN';
  return lang;
};
