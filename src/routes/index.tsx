import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages";
import { useSidebarContext } from "../shared/providers";

const AppRoutes = () => {
  const { setSidebarOptions } = useSidebarContext();

  useEffect(() => {
    setSidebarOptions([
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
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { AppRoutes };
