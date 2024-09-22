import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = () => {
	const { auth } = useAuth();

	// If user is authenticated, redirect to /home or any protected page
	return auth?.user ? <Navigate to="" replace /> : <Outlet />;
};

export default PublicRoute;
