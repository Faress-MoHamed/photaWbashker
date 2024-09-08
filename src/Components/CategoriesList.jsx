import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getAllCategories } from "../API/api";

const CategoriesList = () => {
	const { i18n } = useTranslation();
	const [Categories, setCategories] = useState(null);

	// Fetch categories
	const {
		data: fetchedCategories,
		isError: categoriesIsError,
		isSuccess: categoriesIsSuccess,
		error: errorCategories,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const { data: res } = await getAllCategories();
			console.log(res);
			return res.categories;
		},
	});

	useEffect(() => {
		if (categoriesIsSuccess) {
			setCategories(fetchedCategories);
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
	return (
		<ul
			className={`${i18n.language === "ar" ? "flex-row-reverse" : ""} rounded-lg flex justify-center text-center md:gap-4 gap-2 md:px-4 px-0 md:w-[80%] w-full mx-2 flex-wrap`}
		>
			{Categories && Categories.length > 0 ? (
				<>
					<Link
						to={``}
						className={`md:text-lg text-sm md:w-[250px] w-full text-gray-800 md:px-2 px-0 py-2 font-medium rounded-lg bg-gray-100 hover:bg-gray-200 transition-all`}
					>
						All
					</Link>
					{Categories?.map((category, index) => (
						<Link
							to={`?category=${category?._id}`}
							key={index}
							className={`md:text-lg text-sm md:w-[250px] w-full text-gray-800 md:px-2 px-0 py-2 font-medium rounded-lg bg-gray-100 hover:bg-gray-200 transition-all`}
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
