import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});

	useEffect(() => {
		const user = localStorage.getItem("user");
		const token = localStorage.getItem("token");

		if (user && token) {
			setAuth({
				user: JSON.parse(user),
				token: token,
			});
		}
	}, []); // Runs only once when the component mounts

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
