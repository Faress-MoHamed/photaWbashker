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

export const fetchCategories = async () => {
	try {
		const { data } = await AXIOSHANDLER.get("/categories");
		return data.data || [];
	} catch (error) {
		if (error.response?.status === 500) {
			toast.error("Internet connection error");
		}
		console.error(
			"Error fetching categories:",
			error.response?.data?.message || error.message
		);
		return [];
	}
};

export const AddCategory = async (categoryData) => {
	try {
		const token = getTokenFromCookies();

		const res = await AXIOSHANDLER.post("/categories", categoryData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (error) {
		if (error.response?.status === 500) {
			toast.error("Internet connection error");
		}
		console.error(error?.response?.data?.message || error.message);
	}
};

export const UpdateCategory = async (editCategoryId, categoryData) => {
	try {
		const token = getTokenFromCookies();
		console.log(Array.from(categoryData.entries()));
		const res = await AXIOSHANDLER.patch(
			`/categories/${editCategoryId}`,
			categoryData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res;
	} catch (error) {
		if (error.response?.status === 500) {
			toast.error("Internet connection error");
		}
		console.error(error?.response?.data?.message || error.message);
	}
};

export const DeleteCategory = async (id) => {
	try {
		const token = getTokenFromCookies();

		const { data } = await AXIOSHANDLER.delete(`/categories/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error) {
		if (error.response?.status === 500) {
			toast.error("Internet connection error");
		}
		console.error(error?.response?.data?.message || error.message);
	}
};
