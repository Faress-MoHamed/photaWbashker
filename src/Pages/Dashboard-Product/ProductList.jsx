import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CardsDashboard from "./CardsDashboard";
import AddProductForm from "./AddProductForm";
import { OrbitProgress } from "react-loading-indicators";
import { Helmet } from "react-helmet";
import { fetchProducts } from "../../API/EndPointsProducts";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import { useTranslation } from "react-i18next";
const ProductList = () => {
	const { t } = useTranslation(); // Initialize the translation function

	const [productsResult, setProducts] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		quantity: "",
		price: "",
		colors: [{ hexValue: "#ffffff", colorName: "" }],
		sizes: [{ sizeName: "" }],
		image: null,
		Category: "", // Add categories field
	});
	const [editProductId, setEditProductId] = useState(null);

	useEffect(() => {
		fetchProducts();
		// console.log(editProductId);
	}, [editProductId]);

	const {
		data: products,
		isError: ProductsIsError,
		isLoading: loadingProducts,
		isSuccess: productsSuccess,
		error: errorProducts,
	} = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			try {
				const res = await fetchProducts();
				return res;
			} catch (error) {
				console.log("error in getting products");
			}
		},
		// refetchInterval: 10000, // Refetch every 10 seconds
	});

	useEffect(() => {
		const onSuccess = () => {
			if (productsSuccess) {
				setProducts(products);
			}
		};
		const onError = () => {
			if (ProductsIsError) {
				// Handle error
				console.log(errorProducts);
			}
		};
		onSuccess();
		onError();
	}, [
		products,
		productsSuccess,
		ProductsIsError,
		errorProducts,
		productsResult,
	]);

	return (
		<>
			<Helmet>
				{" "}
				<title>products.</title>
				<meta name="description" content="products" />
			</Helmet>
			<Container>
				<Header>{t("dashboard.headers.productList")}</Header>
				<AddProductForm
					editProductId={editProductId}
					formData={formData}
					setFormData={setFormData}
					setEditProductId={setEditProductId}
				/>
				<div className="grid relative grid-cols-1 min-h-[450px] gap-6 p-6 bg-black/10 md:grid-cols-2 lg:grid-cols-3 rounded-lg shadow-md mt-10">
					{loadingProducts ? (
						<div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
							<OrbitProgress
								variant="track-disc"
								speedPlus="2"
								easing="ease-in-out"
								color={["#7AA486"]}
							/>
						</div>
					) : !products || products.length === 0 ? (
						<p>No Products to display</p>
					) : (
						products.map((product) => (
							<CardsDashboard
								key={product._id} // assuming each product has a unique id
								product={product}
								isLoading={loadingProducts}
								setEditProductId={setEditProductId}
								setFormData={setFormData}
							/>
						))
					)}
				</div>
			</Container>
		</>
	);
};

export default ProductList;
