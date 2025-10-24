import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PublicRoute = () => {
    const { user, login } = useAuth();
    const location = useLocation();
    if(user){
        const to = location?.state?.to || '/dashboard';
        console.log(to, location.state)
        return <Navigate to={to} replace state={location.state} />;
    }

    return <Outlet />
};

export default PublicRoute;
