import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrbitProgress } from "react-loading-indicators";
import toast from "react-hot-toast";
import { DeleteProduct } from "../../API/EndPointsProducts";
import { useTranslation } from "react-i18next";

function CardsDashboard({ product, isLoading, setEditProductId, setFormData }) {
	const queryClient = useQueryClient();
	const { t, i18n } = useTranslation();
	const currentLanguage = i18n.language;
	const API_URL = import.meta.env.REACT_API_URL;
	// console.log(API_URL);

	const { mutate: handleDelete } = useMutation({
		mutationKey: ["products", "deleteProduct"],
		mutationFn: async (editProductId) => {
			try {
				const res = await DeleteProduct(editProductId);
				return res;
			} catch (error) {
				toast.error("error in deleting error");
			}
		},
		onSuccess: (res) => {
			queryClient.invalidateQueries(["products"]);
			resetForm();
			setEditProductId(null);
			toast(res?.message, {
				icon: "👍",
				className: "border-1 border-primary-500",
			}); // Use res.message directly here
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleEdit = (product) => {
		setEditProductId(product._id);
		setFormData({
			name: product.name,
			quantity: product.quantity,
			price: product.price,
			colors: product.colors || [{ hexValue: "", colorName: "" }], // Ensure colors is an array
			sizes: product.sizes || [{ sizeName: "" }], // Ensure sizes is an array
			image: product.image,
			Category: product.Category?._id || "", // Ensure Category?.name is a string
		});
	};

	const resetForm = () => {
		setFormData({
			name: "",
			quantity: "",
			price: "",
			colors: [{ hexValue: "", colorName: "" }],
			sizes: [{ sizeName: "" }],
			image: null,
			Category: "",
		});
	};

	return isLoading ? (
		<OrbitProgress
			variant="track-disc"
			speedPlus="2"
			easing="ease-in-out"
			color={["#7AA486"]}
		/>
	) : (
		<main
			className={`flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-lg ${currentLanguage === "ar" && "text-right"}`}
			dir={currentLanguage === "ar" ? "rtl" : "ltr"}
			key={product._id}
		>
			<img
				src={`${API_URL}/${product?.image}`}
				alt={product.name}
				className="w-40 h-40 object-cover rounded-full mb-4 shadow-md"
			/>
			<h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
			<p className="text-gray-600 mt-2">
				{" "}
				{t("oneProduct.piece")}: {product?.quantity}
			</p>
			<p className="text-gray-600">
				{" "}
				{t("oneProduct.price")}: ${product?.price}
			</p>
			<p className="text-gray-600">
				{t("oneProduct.color")}:{" "}
				{product?.colors.map((color) => color.colorName).join(", ")}
			</p>
			<p className="text-gray-600">
				{t("oneProduct.size")}:{" "}
				{product?.sizes.map((size) => size.sizeName).join(", ")}
			</p>
			<p className="text-gray-600">
				{" "}
				{t("oneProduct.category")}: {product?.Category?.name}
			</p>
			<div className="mt-6 flex gap-4">
				<button
					onClick={() => handleEdit(product)}
					className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all"
				>
					{t("dashboard.productForm.product_Update_Btn")}
				</button>
				<button
					onClick={() => handleDelete(product._id)}
					className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
				>
					{t("dashboard.productForm.product_delete_Btn")}
				</button>
			</div>
		</main>
	);
}

export default CardsDashboard;
