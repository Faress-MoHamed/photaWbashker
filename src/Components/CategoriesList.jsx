import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getAllCategories } from "../API/api";

const CategoriesList = () => {
	const { i18n } = useTranslation();
	const [selectedCategory, setSelectedCategory] = useState(() => {
		// Retrieve the last selected category from sessionStorage, or default to "All"
		return sessionStorage.getItem("selectedCategory") || "All";
	});

	// Fetch categories
	const {
		data: fetchedCategories = [], // Default to an empty array to avoid null issues
		isError: categoriesIsError,
		error: errorCategories,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const { data: res } = await getAllCategories();
			return res.categories;
		},
	});

	// Save the selected category to sessionStorage when user selects a new one
	const handleSelectCategory = (category) => {
		const categoryName = category?.name || "All";
		setSelectedCategory(categoryName);
		sessionStorage.setItem("selectedCategory", categoryName); // Save selected category to sessionStorage
	};

	if (categoriesIsError) {
		console.error("Error fetching categories:", errorCategories);
		return <p>Error loading categories</p>;
	}

	return (
		<ul
			className={`${i18n.language === "ar" ? "flex-row-reverse" : ""} rounded-lg flex justify-center text-center md:gap-4 gap-2 md:px-4 px-0 md:w-[80%] w-full mx-2 flex-wrap`}
		>
			{fetchedCategories.length > 0 ? (
				<>
					<Link
						to={``}
						className={`md:text-lg text-sm md:w-[250px] w-full text-gray-800 md:px-2 px-0 py-2 font-medium rounded-lg bg-gray-100 hover:bg-gray-400 transition-all ${selectedCategory === "All" ? "bg-gray-400" : ""}`}
						onClick={() => handleSelectCategory({ name: "All" })}
					>
						All
					</Link>
					{fetchedCategories.map((category, index) => (
						<Link
							to={`?category=${category?._id}`}
							key={index}
							onClick={() => handleSelectCategory(category)}
							className={`md:text-lg text-sm md:w-[250px] w-full text-gray-800 md:px-2 px-0 py-2 font-medium rounded-lg bg-gray-100 hover:bg-gray-400 transition-all ${selectedCategory === category?.name ? "bg-gray-400" : ""}`}
						>
							{category.name}
						</Link>
					))}
				</>
			) : (
				<p>No Categories</p>
			)}
		</ul>
	);
};

export default CategoriesList;
