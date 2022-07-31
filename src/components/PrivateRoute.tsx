import React from "react";
// import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages";
import { useAuthContext } from "../providers";

interface IPrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) return <>{children}</>;
  return <LoginPage />;
};

export { PrivateRoute };
