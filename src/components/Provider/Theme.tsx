import { darkTheme, lightTheme, ThemeContext, type ThemeConfig } from "@/context/ThemeContext";
import { getStorage, THEME_MODE } from "@/utils/storage";
import { useState } from "react";


const { Provider, Consumer } = ThemeContext;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeMode = getStorage(THEME_MODE) || lightTheme.mode;
  const [defaultTheme, setDefaultTheme] = useState<ThemeConfig>(themeMode === lightTheme.mode ? lightTheme : darkTheme);
  const updateDefaultTheme = (theme: ThemeConfig) => {
    setDefaultTheme(theme);
  };

  return (
    <Provider value={{ defaultTheme, updateDefaultTheme }}>{children}</Provider>
  );
};

export const ThemeConsumer = Consumer;
