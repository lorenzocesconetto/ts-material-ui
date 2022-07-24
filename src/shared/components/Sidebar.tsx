import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import React from "react";
import { useSidebarContext } from "../providers";
import { ListItemLink, ThemeToggle } from "./";

interface ISidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: ISidebarProps) => {
  const theme = useTheme();

  const isScreenXs = useMediaQuery(theme.breakpoints.only("xs"));
  const { isOpen, toggleSidebar, closeSidebar, sidebarOptions } =
    useSidebarContext();

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleSidebar}
        variant={isScreenXs ? "temporary" : "permanent"}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
          paddingBottom={1}
        >
          <Box
            width="100%"
            display="flex"
            height={theme.spacing(20)}
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{
                fontSize: theme.spacing(3),
                height: theme.spacing(8),
                width: theme.spacing(8),
                bgcolor: theme.palette.primary.main,
              }}
            >
              L
            </Avatar>
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {sidebarOptions.map(item => (
                <ListItemLink
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  icon={item.icon}
                  onClick={closeSidebar}
                />
              ))}
            </List>
          </Box>

          <ThemeToggle />
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={isScreenXs ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};

export { Sidebar };
