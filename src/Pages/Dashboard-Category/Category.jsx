import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AddEditCategoryForm from "./AddEditCategoryForm";
import { OrbitProgress } from "react-loading-indicators";
import CategoryCard from "./CategoryCard";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { fetchCategories } from "../../API/EndPointsCategories";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import { useTranslation } from "react-i18next";

function Category() {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({
		name: "",
		image: null,
	});
	const [Categories, setCategories] = useState(null);
	const [editCategoryId, setEditCategoryId] = useState(null);

	// Fetch categories
	const {
		data: fetchedCategories,
		isError: categoriesIsError,
		isLoading: IsLoadingCategories,
		isSuccess: categoriesIsSuccess,
		error: errorCategories,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			try {
				const res = await fetchCategories();
				return res;
			} catch (error) {
				toast.error("error in getting categories");
			}
		},
	});

	useEffect(() => {
		if (categoriesIsSuccess) {
			setCategories(fetchedCategories?.categories);
		}
		if (categoriesIsError) {
			console.error("Error fetching categories:", errorCategories);
		}
	}, [
		categoriesIsSuccess,
		categoriesIsError,
		fetchedCategories,
		errorCategories,
		setCategories,
	]);

	// JSX Form structure
	return (
		<>
			<Helmet>
				{" "}
				<title>category.</title>
				<meta name="description" content="category" />
			</Helmet>
			<Container>
				<Header>{t("dashboard.headers.categoryList")}</Header>
				<AddEditCategoryForm
					formData={formData}
					editCategoryId={editCategoryId}
					setEditCategoryId={setEditCategoryId}
					setFormData={setFormData}
				/>
				<div className="grid relative grid-cols-1 min-h-[450px] gap-6 p-6 bg-black/10 md:grid-cols-2 lg:grid-cols-3 rounded-lg shadow-md mt-10">
					{IsLoadingCategories ? (
						<div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
							<OrbitProgress
								variant="track-disc"
								speedPlus="2"
								easing="ease-in-out"
								color={["#7AA486"]}
							/>
						</div>
					) : !Categories || Categories.length === 0 ? (
						<p>No Category to display</p>
					) : (
						Categories?.map((category) => (
							<CategoryCard
								key={category._id} // assuming each product has a unique id
								category={category}
								isLoading={IsLoadingCategories}
								setEditCategoryId={setEditCategoryId}
								setFormData={setFormData}
							/>
						))
					)}
				</div>
			</Container>
		</>
	);
}

export default Category;
