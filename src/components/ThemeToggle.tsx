import {
  DarkMode as DarkModeIcon,
  WbSunny as WbSunnyIcon,
} from "@mui/icons-material";
import { Box, Switch } from "@mui/material";
import { useThemeContext } from "../providers";

const ThemeToggle = () => {
  const { toggleTheme, themeName } = useThemeContext();
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WbSunnyIcon />
      <Switch defaultChecked={themeName === "dark"} onClick={toggleTheme} />
      <DarkModeIcon />
    </Box>
  );
};

export { ThemeToggle };
