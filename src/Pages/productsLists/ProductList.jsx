import React, { useState, useEffect } from "react";
import Container from "../../Components/Container";
import { fetchProducts } from "../../API/api";
import { useQuery } from "@tanstack/react-query";
import CardsDashboard from "./CardsDashboard";
import AddProductForm from "./AddProductForm";
const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		quantity: "",
		price: "",
		colors: [{ hexValue: "", colorName: "" }],
		sizes: [{ sizeName: "" }],
		image: null,
		categories: "", 
	});
	const [editProductId, setEditProductId] = useState(null);

	useEffect(() => {
		fetchProducts();
	}, [editProductId]);

	const { data, isError, isLoading, isSuccess, error } = useQuery({
		queryKey: ["products"],
		queryFn: () => fetchProducts(),
	});

	useEffect(() => {
		const onSuccess = () => {
			if (isSuccess) {
				setProducts(data);
			}
		};
		const onError = () => {
			if (isError) {
				// Handle error
				console.log(error);
			}
		};
		onSuccess();
		onError();
	}, [data, isSuccess, isError, error, products]);

	return (
		<Container>
			<h1 className="text-2xl font-bold mb-4">Product List</h1>
			<AddProductForm
				editProductId={editProductId}
				formData={formData}
				setFormData={setFormData}
				setEditProductId={setEditProductId}
			/>
			<div className="grid grid-cols-1 gap-6 p-6 bg-black/10 md:grid-cols-2 lg:grid-cols-3 rounded-lg shadow-md mt-10">
				{isLoading ? (
					<p>loading..</p>
				) : (
					products?.map((product, index) => (
						<CardsDashboard
							key={index}
							product={product}
							isLoading={isLoading}
							setEditProductId={setEditProductId}
							setFormData={setFormData}
						/>
					))
				)}
			</div>
		</Container>
	);
};

export default ProductList;
