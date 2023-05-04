import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Provider";
const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
