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

export const fetchProducts = async (category) => {
	try {
		let url = "/products";
		if (category) {
			url += `?category=${category}`;
		}

		// Get the JWT token from cookies

		const { data } = await AXIOSHANDLER.get(url, {
			data: category,
		});

		return data.data || [];
	} catch (error) {
		if (error.response?.status === 500) {
			toast.error("Internet connection error");
		}
		console.error(
			"Error fetching products:",
			error.response?.data?.message || error.message
		);
		return [];
	}
};

export const AddProduct = async (data) => {
	try {
		const token = getTokenFromCookies();
		const res = await AXIOSHANDLER.post("/products", data, {
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

export const UpdateProduct = async (editProductId, formData) => {
	try {
		const token = getTokenFromCookies();
		// console.log(token);
		const res = await AXIOSHANDLER.patch(
			`/products/${editProductId}`,
			formData,
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
		throw new Error(error?.response?.data?.message || error.message);
	}
};

export const DeleteProduct = async (id) => {
	try {
		const token = getTokenFromCookies();

		const { data } = await AXIOSHANDLER.delete(`/products/${id}`, {
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
