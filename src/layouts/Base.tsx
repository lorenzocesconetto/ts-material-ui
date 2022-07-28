import {
  Box,
  Icon,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSidebarContext } from "../providers";

interface IBaseProps {
  children: React.ReactNode;
  title: string;
  toolbar?: React.ReactNode;
}

const Base = ({ children, title, toolbar }: IBaseProps) => {
  const theme = useTheme();
  const isScreenXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isScreenDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleSidebar } = useSidebarContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      {/* Begin: Title */}
      <Box
        display="flex"
        alignItems="center"
        height={theme.spacing(isScreenXs ? 6 : isScreenDownMd ? 8 : 12)}
        gap={1}
      >
        {isScreenXs && (
          <IconButton onClick={toggleSidebar}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          component="h1"
          variant={isScreenXs ? "h5" : isScreenDownMd ? "h4" : "h3"}
          noWrap
        >
          {title}
        </Typography>
      </Box>
      {/* End: Title */}

      {/* Begin: Toolbar */}
      {toolbar && (
        <Box p={2} component={Paper} height={theme.spacing(5)}>
          {toolbar}
        </Box>
      )}
      {/* End: Toolbar */}

      {/* Begin: Content */}
      <Box flex={1} overflow="auto">
        {children}
      </Box>
      {/* End: Content */}
    </Box>
  );
};

export { Base };
