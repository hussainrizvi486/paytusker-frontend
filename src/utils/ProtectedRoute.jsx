import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { getAuthUser } from "../redux/slices/authSlice";



export const ProtectedRoute = ({ allowRole = null, redirectTo = "/login" }) => {
    const { accessToken, isAuthenticated } = getAuthUser();
    if (!accessToken || !isAuthenticated) return <Navigate to={redirectTo} />

    if (allowRole) {
        const { roles } = jwtDecode(accessToken);
        if (!roles.includes(allowRole)) return <Navigate to={redirectTo} />
    }


    return <Outlet />
}
