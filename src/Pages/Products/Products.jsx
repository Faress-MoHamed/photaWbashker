import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import { useTranslation } from "react-i18next";
import { fetchProducts } from "../../API/api";
import CategoriesList from "../../Components/CategoriesList";
import CardsDashboard from "../Dashboard/CardsDashboard";

const Products = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const category = queryParams.get("category");

	const { t, i18n } = useTranslation();

	// Fetch products using React Query's useQuery hook
	const {
		data: products,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["products", category],
		queryFn: () => fetchProducts(category),
	});
	if (isLoading) return <p>Loading products...</p>;
	if (error) return <p>Error: {error.message}</p>;
	return (
		<Container>
			<main
				id="products"
				className={`${i18n.language === "ar" ? "font-Changa" : "font-new-amsterdam"}`}
			>
				<Header>{t("header.products")}</Header>
				<div className="flex justify-center items-center">
					<CategoriesList />
				</div>
				{products?.data?.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 rounded-lg mt-10">
						{products?.data.map((product) => (
							<CardsDashboard product={product} key={product._id} />
						))}
					</div>
				) : (
					<p>No products found{category && ` for this category`}</p>
				)}
			</main>
		</Container>
	);
};

export default Products;
