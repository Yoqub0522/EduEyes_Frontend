import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const location = useLocation();

  const { authinticated, isLoading } = useContext(AuthContext);

  if (isLoading) return <div>Loading...</div>;

  if (!authinticated) {
    return <Navigate to="auth/login" state={{ from: location }} replace />;
  }

  console.log(`This is ${authinticated}`);

  return <Outlet />;
};

export default ProtectedRoute;
