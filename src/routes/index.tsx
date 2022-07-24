import { Button } from "@mui/material";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/providers";

const AppRoutes = () => {
  const { setDrawerOptions, toggleDrawer } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: "Home",
        icon: "home",
        to: "/",
      },
      {
        label: "Cities",
        icon: "star",
        to: "/asd",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Button onClick={toggleDrawer} variant="contained">
            Toggle sidebar
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { AppRoutes };
