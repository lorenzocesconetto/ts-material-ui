import {
  DarkMode as DarkModeIcon,
  WbSunny as WbSunnyIcon,
} from "@mui/icons-material";
import { Box, Switch } from "@mui/material";
import { useState } from "react";
import { useThemeContext } from "../providers";

const ThemeToggle = () => {
  const { toggleTheme, themeName } = useThemeContext();
  const [checked, setChecked] = useState(themeName === "dark");

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WbSunnyIcon />
      <Switch
        checked={checked}
        onChange={() => {
          toggleTheme();
          setChecked(oldChecked => !oldChecked);
        }}
      />
      <DarkModeIcon />
    </Box>
  );
};

export { ThemeToggle };
