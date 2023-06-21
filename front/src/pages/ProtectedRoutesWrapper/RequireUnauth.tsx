import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Provider";
const RequireUnauth = () => {
  const { auth } = useAuth();
  return !auth ? <Outlet /> : <Navigate to="/home" replace />;
};

export default RequireUnauth;
