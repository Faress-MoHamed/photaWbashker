import { AXIOSHANDLER } from "../utils/axiosHandler";

export const fetchProducts = async (category) => {
	try {
		// Construct the URL based on the category
		let url = "/api/products";
		if (category) {
			url += `?Category=${category}`;
		}
		// console.log(url, category);
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
		const { data } = await AXIOSHANDLER.get(`/api/products/${id}`);
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
		const { data } = await AXIOSHANDLER.get(`/api/categories/${id}`);
		console.log(data);
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
		const { data } = await AXIOSHANDLER.get("/api/categories");
		console.log(data);
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
		const res = AXIOSHANDLER.post("/api/products", data, {
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
		const res = await AXIOSHANDLER.put(
			`/api/products/${editProductId}`,
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
		const { data } = await AXIOSHANDLER.delete(`/api/products/${id}`);
		return data;
	} catch (error) {
		console.error(error?.data?.maeeage);
	}
};
