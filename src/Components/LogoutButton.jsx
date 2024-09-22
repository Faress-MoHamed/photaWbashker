import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuth from "../hooks/useAuth";

const LogoutButton = () => {
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	const handleLogout = () => {
		// Clear localStorage
		localStorage.removeItem("token");

		// Remove cookie (assuming 'jwt' is the name of your cookie)
		Cookies.remove("jwt");
		setAuth(null);
		// Redirect to home page
		navigate("/dashboard");
	};

	return (
		<button
			onClick={handleLogout}
			className="focus:outline-none focus:border-none text-black hover:text-black/50 duration-300 transition-colors hover:bg-black/30 rounded-[2px] bg-black/10 px-[5px] py-[1px]"
		>
			Logout
		</button>
	);
};

export default LogoutButton;
