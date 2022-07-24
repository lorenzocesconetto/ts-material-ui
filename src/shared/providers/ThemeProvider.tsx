import { Box, ThemeProvider as MuiThemeProvider } from "@mui/material";
import React, { useCallback, useContext, useMemo } from "react";
import { createContext, useState } from "react";
import { LightTheme, DarkTheme } from "../themes";

const STORAGE_THEME_NAME = "themeName";

type IThemeName = "light" | "dark";

interface IThemeProviderData {
  toggleTheme(): void;
  themeName: string;
}

interface IThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<IThemeProviderData>(
  {} as IThemeProviderData
);

const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const initialTheme = (localStorage.getItem(STORAGE_THEME_NAME) ??
    "light") as IThemeName;
  const [themeName, setThemeName] = useState<IThemeName>(initialTheme);

  const toggleTheme = useCallback(() => {
    setThemeName(currentTheme => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_THEME_NAME, newTheme);
      return newTheme;
    });
  }, [themeName]);

  const theme = useMemo(
    () => (themeName === "light" ? LightTheme : DarkTheme),
    [themeName]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeName }}>
      <MuiThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { useThemeContext, ThemeProvider };
