import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { AddProduct, UpdateProduct } from "../../API/EndPointsProducts";
import { fetchCategories } from "../../API/EndPointsCategories";
import { useTranslation } from "react-i18next";

function AddProductForm({
	formData,
	setFormData,
	editProductId,
	setEditProductId,
}) {
	const { t, i18n } = useTranslation(); // Initialize the translation function
	const currentLanguage = i18n.language;
	const queryClient = useQueryClient();
	const fileInputRef = useRef(null);
	const [categories, setCategories] = useState([]);
	const { setIsloading } = useLoading();
	const API_URl = import.meta.env.REACT_API_URL;
	console.log(API_URl);
	// Add Product mutation
	const { mutate: addProduct, isLoading: IsLoadingAddProduct } = useMutation({
		mutationKey: ["products", "newProduct"],
		mutationFn: async (data) => {
			try {
				await AddProduct(data);
			} catch (error) {
				toast.error("error in adding product");
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["products"]);
			resetForm();
			setEditProductId(null);
			setIsloading(false);
		},
		onError: (error) => {
			console.error(
				"Error adding product:",
				error.response?.data || error.message
			);
		},
		onMutate: () => {
			setIsloading(true);
		},
	});

	// Update Product mutation
	const { mutate: updateProduct, isPending: IsLoadingUpdateProduct } =
		useMutation({
			mutationKey: ["products", "editProduct"],
			mutationFn: async (data) => {
				try {
					console.log(editProductId);
					const res = await UpdateProduct(editProductId, data);
					return res;
				} catch (error) {
					toast.error("error in updating product");
				}
			},
			onSuccess: (res) => {
				queryClient.invalidateQueries(["products"]);
				resetForm();
				setEditProductId(null);
				setIsloading(false);
				toast(res?.message || "Product updated successfully", {
					icon: "👍",
					className: "border-1 border-primary-500",
				});
			},
			onError: (error) => {
				console.error(
					"Error updating product:",
					error.response?.data || error.message
				);
			},
		});

	useEffect(() => {
		if (IsLoadingAddProduct) {
			setIsloading(true);
		} else if (IsLoadingUpdateProduct) {
			setIsloading(true);
		} else {
			setIsloading(false);
		}
	}, [IsLoadingAddProduct, IsLoadingUpdateProduct, setIsloading]);
	// Reset form function
	const resetForm = () => {
		setFormData({
			name: "",
			quantity: "",
			price: "",
			colors: [{ hexValue: "#ffffff", colorName: "" }],
			sizes: [{ sizeName: "" }],
			image: null,
			Category: "",
		});

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
		formik.resetForm();
	};

	const formik = useFormik({
		initialValues: formData,
		enableReinitialize: true,
		onSubmit: async (values) => {
			const data = new FormData();
			data.append("name", values.name);
			data.append("quantity", values.quantity);
			data.append("price", values.price);
			data.append("colors", JSON.stringify(values.colors));
			data.append("sizes", JSON.stringify(values.sizes));
			data.append("Category", values.Category);
			if (values.image) {
				data.append("image", values.image);
			}

			try {
				if (editProductId) {
					updateProduct(data);
				} else {
					addProduct(data);
				}
			} catch (error) {
				console.error("Error submitting product:", error.message);
			}
		},
	});

	const {
		data: fetchedCategories,
		isError: categoriesIsError,
		isSuccess: categoriesIsSuccess,
		error: errorCategories,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: () => fetchCategories(),
	});

	useEffect(() => {
		if (categoriesIsSuccess) {
			setCategories(fetchedCategories.categories);
		}
		if (categoriesIsError) {
			console.error("Error fetching categories:", errorCategories);
		}
	}, [
		categoriesIsSuccess,
		categoriesIsError,
		fetchedCategories,
		errorCategories,
	]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleColorChange = (index, e) => {
		const { name, value } = e.target;
		const newColors = [...formData.colors];
		newColors[index][name] = value;
		setFormData({ ...formData, colors: newColors });
	};

	const handleColorRemove = (index) => {
		const newColors = formData.colors.filter((_, i) => i !== index);
		setFormData({ ...formData, colors: newColors });
	};

	const addColorField = () => {
		setFormData({
			...formData,
			colors: [...formData.colors, { hexValue: "#ffffff", colorName: "" }],
		});
	};

	const handleSizeChange = (index, e) => {
		const { value } = e.target;
		const newSizes = [...formData.sizes];
		newSizes[index].sizeName = value;
		setFormData({ ...formData, sizes: newSizes });
	};

	const handleSizeRemove = (index) => {
		const newSizes = formData.sizes.filter((_, i) => i !== index);
		setFormData({ ...formData, sizes: newSizes });
	};

	const addSizeField = () => {
		setFormData({
			...formData,
			sizes: [...formData.sizes, { sizeName: "" }],
		});
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	};
	// JSX Form structure
	return (
		<form
			onSubmit={formik.handleSubmit}
			className={`flex flex-col gap-4 p-7 bg-black/10 shadow-xl rounded-lg ${currentLanguage === "ar" && "text-right"}`}
			dir={currentLanguage === "ar" ? "rtl" : "ltr"}
		>
			<div className="flex w-full md:flex-row flex-col justify-evenly gap-3">
				<input
					type="text"
					name="name"
					placeholder={t("dashboard.productForm.product_name")}
					value={formData.name}
					onChange={handleInputChange}
					className="p-4 border-2 border-gray-300 rounded-lg w-full md:w-2/4 bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
				/>
				<input
					type="number"
					min={0}
					name="quantity"
					placeholder={t("dashboard.productForm.product_quantity")}
					value={formData.quantity}
					onChange={handleInputChange}
					className="p-4 border-2 border-gray-300 rounded-lg w-full md:w-2/4 bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
				/>
			</div>
			<div className="flex w-full md:flex-row flex-col justify-evenly gap-3">
				<input
					type="number"
					name="price"
					min={0}
					placeholder={t("dashboard.productForm.product_price")}
					value={formData.price}
					onChange={handleInputChange}
					className="p-4 border-2 border-gray-300 rounded-lg w-full md:w-2/4 bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
				/>
				<select
					name="Category"
					value={formData.Category}
					onChange={handleInputChange}
					className="p-4 border-2 border-gray-300 rounded-lg w-full md:w-2/4 bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
					required
				>
					<option value="" disabled>
						{t("dashboard.productForm.product_category")}
					</option>
					{categories?.map((category) => (
						<option key={category._id} value={category._id}>
							{category.name}
						</option>
					))}
				</select>
			</div>
			{formData?.colors?.map((color, index) => (
				<div key={index} className={`flex items-center space-x-3 `}>
					<input
						type="text"
						name="colorName"
						placeholder={t("dashboard.productForm.product_color")}
						value={color.colorName}
						onChange={(e) => handleColorChange(index, e)}
						className="p-4 border-2 border-gray-300 rounded-lg w-2/4 bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
					/>
					<div className="flex items-center">
						<label htmlFor="hexColor" className="font-Changa">
							{currentLanguage === "ar" ? "اللون Hex:" : "Hex Color:"}
						</label>
						<input
							id="hexColor"
							type="color"
							name="hexValue"
							value={color.hexValue}
							onChange={(e) => handleColorChange(index, e)}
							className="w-12 h-12 border-none rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
						/>
					</div>

					{index !== 0 && (
						<button
							type="button"
							onClick={() => handleColorRemove(index)}
							className="bg-red-500 hover:bg-red-400 p-1 rounded-lg text-white duration-150 transition-all"
						>
							{t("dashboard.productForm.remove")}
						</button>
					)}
				</div>
			))}
			<div className="flex items-center">
				<button
					type="button"
					onClick={addColorField}
					className="p-4 w-[250px] bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
				>
					{t("dashboard.productForm.product_btn_color")}
				</button>
			</div>
			{formData?.sizes?.map((size, index) => (
				<div key={index} className={`flex items-center gap-3`}>
					<input
						type="text"
						placeholder={t("dashboard.productForm.product_size")}
						value={size.sizeName}
						onChange={(e) => handleSizeChange(index, e)}
						className="p-4 border-2 border-gray-300 rounded-lg w-2/4 bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
					/>
					{index !== 0 && (
						<button
							type="button"
							onClick={() => handleColorRemove(index)}
							className="bg-red-500 hover:bg-red-400 p-1 rounded-lg text-white duration-150 transition-all "
						>
							{t("dashboard.productForm.remove")}
						</button>
					)}
				</div>
			))}
			<div className="flex items-center">
				<button
					type="button"
					onClick={addSizeField}
					className="p-4 w-[250px] bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
				>
					{t("dashboard.productForm.product_btn_size")}
				</button>
			</div>
			{/* Display image preview */}

			{formData.image && editProductId && (
				<div className="flex items-center flex-col justify-center">
					<p className="text-gray-600">
						{t("dashboard.productForm.current_image")}
					</p>
					<img
						src={`${API_URl}/${formData.image}`}
						alt="Product update"
						className="w-40 h-40 object-cover rounded mb-4"
					/>
				</div>
			)}

			<div className="flex items-center">
				<input
					ref={fileInputRef}
					type="file"
					name="image"
					accept="image/*"
					onChange={handleFileChange}
					className="p-4 border-2 border-gray-300 rounded-lg w-full bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
				/>
			</div>
			<div className="flex items-center justify-center">
				<button
					type="submit"
					disabled={IsLoadingAddProduct}
					className={`p-4 w-full md:w-[250px] bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all ${
						IsLoadingAddProduct ? "opacity-50" : ""
					}`}
				>
					{editProductId
						? t("dashboard.productForm.product_Update_Btn")
						: t("dashboard.productForm.product_Add_Btn")}
				</button>
			</div>
		</form>
	);
}

export default AddProductForm;
