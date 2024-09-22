import { AXIOSHANDLER } from "../utils/axiosHandler";

export const fetchProducts = async (category) => {
	try {
		// Construct the URL based on the category
		let url = "/products";
		if (category) {
			url += `?Category=${category}`;
		}
		// Fetch the data from the API
		const { data } = await AXIOSHANDLER.get(url, {
			data: category,
		});

		// Return the list of products
		return data || [];
	} catch (error) {
		// Log the error message
		console.error(
			"Error fetching products:",
			error.response?.data?.message || error.message
		);

		// Return an empty array as a fallback
		return [];
	}
};
export const GetById = async (id) => {
	try {
		const { data } = await AXIOSHANDLER.get(`/products/${id}`);
		return data || [];
	} catch (error) {
		console.error(
			"Error fetching products:",
			error.response?.data?.message || error.message
		);
		return [];
	}
};
export const GetCategoryId = async (id) => {
	try {
		const { data } = await AXIOSHANDLER.get(`/categories/${id}`);
		return data || [];
	} catch (error) {
		console.error(
			"Error fetching category:",
			error.response?.data?.message || error.message
		);
		return [];
	}
};

export const getAllCategories = async (category) => {
	try {
		// Construct the URL based on the category

		// Fetch the data from the API
		const { data } = await AXIOSHANDLER.get("/categories");
		// Return the list of products
		return data || [];
	} catch (error) {
		// Log the error message
		console.error(
			"Error fetching products:",
			error.response?.data?.message || error.message
		);

		// Return an empty array as a fallback
		return [];
	}
};

export const AddProduct = async (data) => {
	try {
		const res = AXIOSHANDLER.post("/products", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return res;
	} catch (error) {
		console.error(error?.data?.maeeage);
	}
};
export const UpdateProduct = async (editProductId, formData) => {
	try {
		const res = await AXIOSHANDLER.patch(
			`/products/${editProductId}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return res;
	} catch (error) {
		console.error(error?.data?.maeeage);
	}
};
export const DeleteProduct = async (id) => {
	try {
		const { data } = await AXIOSHANDLER.delete(`/products/${id}`);
		return data;
	} catch (error) {
		console.error(error?.data?.maeeage);
	}
};
