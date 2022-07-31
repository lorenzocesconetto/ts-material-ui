import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import React from "react";
import { useAuthContext, useSidebarContext } from "../providers";
import { ListItemLink, ThemeToggle } from ".";

interface ISidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: ISidebarProps) => {
  const theme = useTheme();
  const { logout } = useAuthContext();
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
          <List component="nav">
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <Icon>logout</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <Box
        height="100vh"
        overflow="auto"
        marginLeft={isScreenXs ? 0 : theme.spacing(28)}
        bgcolor={theme.palette.background.default}
      >
        {/* If these paddings below are added to the above Box instead, then the scroll gets weird, i.e., it gets some kind of breakpoints */}
        <Box px={3} pt={0} pb={7}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export { Sidebar };
