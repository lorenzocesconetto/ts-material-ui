import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useToggleTheme } from "../shared/providers";

export const AppRoutes = () => {
  const toggleTheme = useToggleTheme();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Button variant="contained" onClick={toggleTheme}>
            Toggle theme
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
