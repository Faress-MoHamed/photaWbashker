import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrbitProgress } from "react-loading-indicators";
import toast from "react-hot-toast";
import { DeleteCategory } from "../../API/EndPointsCategories";
import { useTranslation } from "react-i18next";

function CategoryCard({ category, isLoading, setEditCategoryId, setFormData }) {
	const queryClient = useQueryClient();
	const { t } = useTranslation();
	const API_URL = import.meta.env.REACT_API_URL;

	const { mutate: handleDelete } = useMutation({
		mutationKey: ["categories", "deleteCategory"],
		mutationFn: async (categoryId) => {
			try {
				const res = await DeleteCategory(categoryId);
				return res;
			} catch (error) {
				toast.error("Error deleting category");
			}
		},
		onSuccess: (res) => {
			queryClient.invalidateQueries(["categories"]);
			resetForm();
			setEditCategoryId(null);
			toast(res?.message, {
				icon: "👍",
				className: "border-1 border-primary-500",
			}); // Use res.message directly here
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleEdit = (category) => {
		setEditCategoryId(category._id);
		setFormData({
			name: category.name,
		});
	};

	const resetForm = () => {
		setFormData({
			name: "",
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
			className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-lg lg:p-0 p-3"
			key={category._id}
		>
			<img
				src={`${API_URL}/${category?.image}`}
				alt={category.name}
				className="w-40 h-40 object-cover rounded-full mb-4 shadow-md"
			/>
			<h2 className="text-2xl font-semibold text-gray-800">{category.name}</h2>
			<div className="mt-6 flex space-x-4">
				<button
					onClick={() => handleEdit(category)}
					className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all"
				>
					{t("dashboard.categoryForm.category_Update_Btn")}
				</button>
				<button
					onClick={() => handleDelete(category._id)}
					className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
				>
					{t("dashboard.categoryForm.category_delete_Btn")}
				</button>
			</div>
		</main>
	);
}

export default CategoryCard;
