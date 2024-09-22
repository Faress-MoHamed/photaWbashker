import toast from "react-hot-toast";
import { AXIOSHANDLER } from "../utils/axiosHandler";

// Utility function to get the JWT token
const getTokenFromCookies = () => {
	const cookieValue = document.cookie
		.split("; ")
		.find((row) => row.startsWith("jwt="))
		?.split("=")[1];
	return cookieValue || "";
};

// Sign in API
export const signIn = async (values) => {
	try {
		const res = AXIOSHANDLER.post("users/login", values);
		return res;
	} catch (error) {
		if (error.response?.status === 500) {
			return toast.error("Internet connection error");
		}
		// console.log(error.response?.data?.message);
		toast.error(error.response?.data?.message || error.message);
	}
};

// Sign up as admin API
export const SignUp = async (values) => {
	try {
		const res = AXIOSHANDLER.post("users/signup", { ...values, role: "admin" });
		return res;
	} catch (error) {
		if (error.response?.status === 500) {
			return toast.error("Internet connection error");
		}
		// console.log("error:", error);
		toast.error(error.response?.data?.message || "Error in Sign Up ");
	}
};

// Get the profile of the logged-in user
export const GetMe = async () => {
	try {
		const token = getTokenFromCookies();
		const { data: res } = await AXIOSHANDLER.get("users/me", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return res?.data;
	} catch (error) {
		if (error.response?.status === 500) {
			return toast.error("Internet connection error");
		}
		toast.error(
			error.response?.data?.message || "Error in Get Profile Details "
		);
	}
};

// Update logged-in user details
export const updateMe = async (values) => {
	try {
		const token = getTokenFromCookies();
		const { data: res } = await AXIOSHANDLER.patch("users/updateMe", values, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data.user;
	} catch (error) {
		if (error.response?.status === 500) {
			return toast.error("Internet connection error");
		}
		toast.error(
			error.response?.data?.message || "Error in Update Profile Details "
		);
	}
};

// Update password of the logged-in user
export const updatePasswordUser = async (values) => {
	try {
		const token = getTokenFromCookies();
		const res = await AXIOSHANDLER.patch("users/updateMyPassword", values, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (error) {
		if (error.response?.status === 500) {
			return toast.error("Internet connection error");
		}
		toast.error(error.response?.data?.message || "Error in Update Password ");
	}
};

// Get all users (admins included)
export const GetAllAdmins = async () => {
	try {
		const token = getTokenFromCookies();
		const { data: res } = await AXIOSHANDLER.get("users", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		// console.log(res);
		return res?.data?.admins;
	} catch (error) {
		if (error.response?.status === 500) {
			return toast.error("Internet connection error");
		}
		toast.error(error.response?.data?.message || "Error fetching users");
	}
};

// Add a new admin
export const addAdmin = async (values) => {
	try {
		// console.log(values);
		const token = getTokenFromCookies();
		const { data: res } = await AXIOSHANDLER.post("users/addAdmin", values, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		toast.success("Admin added successfully");
		return res;
	} catch (error) {
		if (error.response?.status === 500) {
			return toast.error("Internet connection error");
		}
		toast.error(error.response?.data?.message || "Error adding admin");
	}
};

// Delete an admin by ID
export const deleteAdmin = async (id) => {
	try {
		const token = getTokenFromCookies();
		const res = await AXIOSHANDLER.delete(`users/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		toast.success("Admin deleted successfully");
		return res;
	} catch (error) {
		if (error.response?.status === 500) {
			return toast.error("Internet connection error");
		}
		toast.error(error.response?.data?.message || "Error deleting admin");
	}
};

// Update an admin's details by ID
export const updateAdmin = async (id, values) => {
	try {
		// console.log(id, values);
		const token = getTokenFromCookies();
		const { data: res } = await AXIOSHANDLER.patch(`users/${id}`, values, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		toast.success("Admin updated successfully");
		return res;
	} catch (error) {
		if (error.response?.status === 500) {
			return toast.error("Internet connection error");
		}
		toast.error(error.response?.data?.message || "Error updating admin");
	}
};
