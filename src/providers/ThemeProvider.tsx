import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import React, { useCallback, useContext, useMemo } from "react";
import { createContext, useState } from "react";
import { LightTheme, DarkTheme } from "../themes";

const STORAGE_THEME_NAME = "themeName";

type TThemeName = "light" | "dark";

interface IThemeProviderData {
  toggleTheme(): void;
  themeName: TThemeName;
}

interface IThemeProviderProps {
  children: React.ReactNode;
}

const initialTheme = (localStorage.getItem(STORAGE_THEME_NAME) ??
  "light") as TThemeName;

const ThemeContext = createContext({} as IThemeProviderData);

const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [themeName, setThemeName] = useState<TThemeName>(initialTheme);

  const toggleTheme = useCallback(() => {
    setThemeName(currentTheme => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_THEME_NAME, newTheme);
      return newTheme;
    });
  }, []);

  const theme = useMemo(
    () => (themeName === "light" ? LightTheme : DarkTheme),
    [themeName]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeName }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { useThemeContext, ThemeProvider };
