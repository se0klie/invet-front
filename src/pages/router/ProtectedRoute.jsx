import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const { user, login } = useAuth();
    // return user ? <Outlet /> : <Navigate to="/login" replace />;
    return  <Outlet />
};

export default ProtectedRoute;
