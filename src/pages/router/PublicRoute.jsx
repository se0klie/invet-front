import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
const PublicRoute = () => {
    const { user, login } = useAuth();
    // return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
    return <Outlet />

};

export default PublicRoute;
