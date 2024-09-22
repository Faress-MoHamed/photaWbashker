import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const RequireAuth = ({ allowedRoles }) => {
	const location = useLocation();
	const { auth } = useAuth();
	useEffect(() => {
		console.log(auth?.user?.role);
	}, []);
	return (
		<>
			{auth?.user && allowedRoles?.includes(auth?.user?.role) ? (
				<Outlet />
			) : auth?.user ? (
				// If user is logged in but doesn't have the correct role
				<Navigate to="/dashboard" state={{ from: location }} replace />
			) : (
				// If user is not logged in
				<Navigate to="/dashboard/sign" state={{ from: location }} replace />
			)}
		</>
	);
};

export default RequireAuth;
