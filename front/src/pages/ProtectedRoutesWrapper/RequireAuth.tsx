import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Provider";
const RequireAuth = () => {
  const { auth } = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
