import { Box, ThemeProvider as MuiThemeProvider } from "@mui/material";
import React, { useCallback, useContext, useMemo } from "react";
import { createContext, useState } from "react";
import { LightTheme, DarkTheme } from "../themes";

type IThemeProviderData = () => void;

interface IThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<IThemeProviderData>(() => undefined);

const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setThemeName(themeName === "light" ? "dark" : "light");
  }, [themeName]);

  const theme = useMemo(
    () => (themeName === "light" ? LightTheme : DarkTheme),
    [themeName]
  );

  return (
    <ThemeContext.Provider value={toggleTheme}>
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

const useToggleTheme = () => useContext(ThemeContext);

export { useToggleTheme, ThemeProvider };
