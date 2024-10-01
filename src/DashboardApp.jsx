// dashboard/App.jsx (Dashboard Project)
import { jwtDecode } from "jwt-decode";
import { Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./Context/LoadingProvider.jsx";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import LayoutDashboard from "./Pages/LayoutDashboard";
import RequireAuth from "./Components/RequireAuth.jsx";
import ProductList from "./Pages/Dashboard-Product/ProductList.jsx";
import Category from "./Pages/Dashboard-Category/Category.jsx";
import { ModalProvider } from "./Context/ModalProvider.jsx";
import PublicRoute from "./Components/PublicRoute.jsx";
import GetAllUsers from "./Pages/Dashboard-Users/GetAllUsers.jsx";
import DashboardHome from "./Pages/Dashboard-Home/DashboardHome.jsx";
import Sign from "./Components/Sign.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth.js";
import Review from "./Pages/Dashboard-Reviews/Review.jsx";
// import "./i18n-dashboard";

function DashboardApp() {
	const navigate = useNavigate();
	const { setAuth } = useAuth();
	useEffect(() => {
		const verifyToken = () => {
			try {
				const token = localStorage?.getItem("token");
				if (!token) return;

				const decodedToken = jwtDecode(token);
				const tokenLifetimeInMinutes =
					(decodedToken.exp - decodedToken.iat) / 60 / 60 / 24;

				console.log(`Token lifetime: ${tokenLifetimeInMinutes} days`);
			} catch (error) {
				console.error("Failed to verify token:", error);
			}
		};

		verifyToken();
	}, []);

	useEffect(() => {
		const handleLogout = () => {
			// Clear localStorage
			localStorage.removeItem("token");

			// Remove cookie (assuming 'jwt' is the name of your cookie)
			Cookies.remove("jwt");
			setAuth(null);
			// Redirect to home page
			navigate("/dashboard");
		};
		console.log(Cookies.get("jwt"));
		!Cookies.get("jwt") && handleLogout();
	}, []);

	const routes = (
		<Routes>
			<Route element={<LayoutDashboard />} path="">
				{/* Public Route */}
				<Route element={<PublicRoute />}>
					<Route path="sign" element={<Sign />} />
				</Route>

				{/* Protected Routes */}
				<Route element={<RequireAuth allowedRoles={["owner"]} />}>
					<Route path="user" element={<GetAllUsers />} />
				</Route>

				<Route element={<RequireAuth allowedRoles={["owner", "admin"]} />}>
					<Route path="" index={true} element={<DashboardHome />} />
					<Route path="products" element={<ProductList />} />
					<Route path="category" element={<Category />} />
					<Route path="reviews" element={<Review />} />
				</Route>
			</Route>
		</Routes>
	);

	return (
		<ModalProvider>
			<LoadingProvider>
				<Toaster position="top-right" />
				{routes}
			</LoadingProvider>
		</ModalProvider>
	);
}

export default DashboardApp;
