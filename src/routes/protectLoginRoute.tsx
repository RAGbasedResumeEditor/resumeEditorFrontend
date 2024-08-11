import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectLoginRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  let accessToken = localStorage.getItem("access") ?? "";

  if (accessToken !== "") {
    return <Navigate to="/main/resume" replace />;
  }

  return <>{children}</>;
};

export default ProtectLoginRoute;
