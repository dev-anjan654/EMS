import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { role, isAuthentic } = useContext(AuthContext);
  const location = useLocation();

  if(!isAuthentic && location.pathname === '/') {
    return <>{element}</>
  }
  
  // If user is not authenticated, redirect to login
  if (!isAuthentic) {
    return <Navigate to="/" />;
  }

  // If authenticated but user is trying to access admin page without admin role
  if (location.pathname === "/admin/" && role !== "admin") {
    return <Navigate to="/employee" />;
  }

  // If authenticated but user is trying to access employee page without employee role
  if (location.pathname === '/employee/' && role !== "employee") {
    return <Navigate to="/admin" />;
  }

  // If the user is authenticated and trying to access their role's default page, redirect them to their respective dashboard
  if (role === "admin" && location.pathname === "/") {
    return <Navigate to="/admin/dashboard" />;
  }
  if (role === "employee" && location.pathname === "/") {
    return <Navigate to="/employee/dashboard" />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
