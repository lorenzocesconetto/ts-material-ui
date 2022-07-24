import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDrawerContext } from "../providers";

interface IBaseProps {
  children: React.ReactNode;
  title: string;
  toolbar?: React.ReactNode;
}

const Base = ({ children, title, toolbar }: IBaseProps) => {
  const theme = useTheme();
  const isScreenXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isScreenDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleDrawer } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        // height={theme.spacing(12)}
        height={theme.spacing(isScreenXs ? 6 : isScreenDownMd ? 8 : 12)}
        gap={1}
      >
        {isScreenXs && (
          <IconButton onClick={toggleDrawer}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          component="h1"
          variant={isScreenXs ? "h5" : isScreenDownMd ? "h4" : "h3"}
          noWrap
          // whiteSpace="nowrap"
          // overflow="hidden"
          // textOverflow="ellipsis"
        >
          {title}
        </Typography>
      </Box>

      {toolbar && <Box>{toolbar}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};

export { Base };
