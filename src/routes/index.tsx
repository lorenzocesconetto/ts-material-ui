import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext, useToggleTheme } from "../shared/providers";

const AppRoutes = () => {
  const { toggleDrawer } = useDrawerContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Button variant="contained" onClick={toggleDrawer}>
            Toggle theme
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { AppRoutes };
