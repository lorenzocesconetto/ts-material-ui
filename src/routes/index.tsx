import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  CitiesListPage,
  DashboardPage,
  PeopleListPage,
  PeopleDetailPage,
  CitiesDetailPage,
} from "../pages";
import { useSidebarContext } from "../providers";

const AppRoutes = () => {
  const { setSidebarOptions } = useSidebarContext();
  const routes = [
    {
      label: "Home",
      icon: "home",
      to: "/",
      element: <DashboardPage />,
    },
    {
      label: "Cities",
      icon: "location_city",
      to: "/cities",
      element: <CitiesListPage />,
    },
    {
      label: "People",
      icon: "people",
      to: "/people",
      element: <PeopleListPage />,
    },
  ];

  useEffect(() => {
    setSidebarOptions(routes);
  }, []);

  return (
    <Routes>
      {routes.map(option => (
        <Route key={option.to} path={option.to} element={option.element} />
      ))}
      <Route path="/people/:id" element={<PeopleDetailPage />} />
      <Route path="/cities/:id" element={<CitiesDetailPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { AppRoutes };
