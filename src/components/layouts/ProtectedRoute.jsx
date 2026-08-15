import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/authContext/useAuth";
import LoadingPage from "../pages/user_page/loading/LoadingPage";


export default function ProtectedRoute({ allowedRoles }) {

    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingPage></LoadingPage>;
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    } 
    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }  
    return <Outlet />
}