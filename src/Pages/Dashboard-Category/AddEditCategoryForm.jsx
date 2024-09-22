import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { useRef } from "react";
import { AddCategory, UpdateCategory } from "../../API/EndPointsCategories";
import { useTranslation } from "react-i18next";

function AddEditCategoryForm({
	editCategoryId,
	setEditCategoryId,
	formData,
	setFormData,
}) {
	const queryClient = useQueryClient();
	const { setIsloading } = useLoading();
	const fileInputRef = useRef(null);
	const { t, i18n } = useTranslation();
	const currentLanguage = i18n.language;

	// Add Category mutation
	const { mutate: addCategory, isLoading: isLoadingAddCategory } = useMutation({
		mutationKey: ["Category", "newCategory"],
		mutationFn: async (data) => {
			try {
				await AddCategory(data);
			} catch (error) {
				toast.error("Error adding category");
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["categories"]);
			resetForm();
			setIsloading(false);
			toast.success("Category added successfully!");
		},
		onError: (error) => {
			console.error(
				"Error adding category:",
				error.response?.data || error.message
			);
		},
		onMutate: () => {
			setIsloading(true);
		},
	});

	// Update Category mutation
	const { mutate: updateCategory, isLoading: isLoadingUpdateCategory } =
		useMutation({
			mutationKey: ["Category", "updateCategory"],
			mutationFn: async (data) => {
				try {
					const res = await UpdateCategory(editCategoryId, data);
					return res;
				} catch (error) {
					toast.error("Error updating category");
				}
			},
			onSuccess: () => {
				queryClient.invalidateQueries(["categories"]);
				resetForm();
				setIsloading(false);
				toast.success("Category updated successfully!");
			},
			onError: (error) => {
				console.error(
					"Error updating category:",
					error.response?.data || error.message
				);
			},
			onMutate: () => {
				setIsloading(true);
			},
		});

	const formik = useFormik({
		initialValues: formData,
		enableReinitialize: true,
		onSubmit: async (values) => {
			const formData = new FormData();
			formData.append("name", values.name);

			if (values.image) {
				formData.append("image", values.image);
			}
			// console.log("FormData before submit:", Array.from(formData.entries())); // Debugging log
			try {
				if (editCategoryId) {
					updateCategory(formData);
				} else {
					addCategory(formData);
				}
			} catch (error) {
				toast.error("faild in adding or updating Category");
			}
		},
	});

	const resetForm = () => {
		formik.resetForm();
		setFormData({
			name: "",
			image: null,
		});

		// Reset file input
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
		setEditCategoryId(null);
	};

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="flex flex-col gap-4 p-7 bg-black/10 shadow-xl rounded-lg"
			dir={currentLanguage === "ar" ? "rtl" : "ltr"}
		>
			<div className="flex w-full">
				<input
					type="text"
					name="name"
					placeholder={t("dashboard.categoryForm.category_name")}
					value={formik.values.name}
					onChange={formik.handleChange}
					className="p-4 border-2 border-gray-300 rounded-lg w-full bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
				/>
			</div>

			<div className="flex w-full">
				<input
					ref={fileInputRef}
					type="file"
					name="image"
					accept="image/*"
					onChange={(event) => {
						formik.setFieldValue("image", event.currentTarget.files[0]);
					}}
					className="p-4 border-2 border-gray-300 rounded-lg w-full bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
				/>
			</div>

			<div className="flex items-center justify-center">
				<button
					type="submit"
					disabled={isLoadingAddCategory || isLoadingUpdateCategory}
					className={`p-4 w-full md:w-[250px] bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all ${
						isLoadingAddCategory || isLoadingUpdateCategory ? "opacity-50" : ""
					}`}
				>
					{editCategoryId
						? t("dashboard.categoryForm.category_Update_Btn")
						: t("dashboard.categoryForm.category_Add_Btn")}
				</button>
			</div>
		</form>
	);
}

export default AddEditCategoryForm;
