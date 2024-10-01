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

// Fetch all reviews or reviews by product
export const fetchReviews = async (productId) => {
	try {
		let url = "/reviews";
		if (productId) {
			url += `?product=${productId}`;
		}

		const { data } = await AXIOSHANDLER.get(url, {
			data: productId,
		});

		return data.data || [];
	} catch (error) {
		if (error.response?.status === 500) {
			toast.error("Internet connection error");
		}
		console.error(
			"Error fetching reviews:",
			error.response?.data?.message || error.message
		);
		return [];
	}
};

// Add a new review
export const AddReview = async (data) => {
	try {
		const token = getTokenFromCookies();
		const res = await AXIOSHANDLER.post("/reviews", data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(res);
		return res;
	} catch (error) {
		if (error.response?.status === 500) {
			toast.error("Internet connection error");
		}
		console.error(error?.response?.data?.message || error.message);
	}
};

// Update a review
export const UpdateReview = async (editReviewId, formData) => {
	try {
		const token = getTokenFromCookies();
		const res = await AXIOSHANDLER.patch(`/reviews/${editReviewId}`, formData, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (error) {
		if (error.response?.status === 500) {
			toast.error("Internet connection error");
		}
		throw new Error(error?.response?.data?.message || error.message);
	}
};

// Delete a review
export const DeleteReview = async (id) => {
	try {
		const token = getTokenFromCookies();

		const { data } = await AXIOSHANDLER.delete(`/reviews/${id}`, {
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
