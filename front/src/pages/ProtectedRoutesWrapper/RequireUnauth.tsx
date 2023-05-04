import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Provider";
const RequireUnauth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return !auth ? <Outlet /> : <Navigate to="/home" replace />;
};

export default RequireUnauth;
