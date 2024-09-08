import { useQuery } from "@tanstack/react-query";
import { GetById, GetCategoryId } from "../../API/api";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Container from "../../Components/Container";

const OneProduct = () => {
	const { id } = useParams();

	let { isLoading, data: product } = useQuery({
		queryKey: ["products", id],
		queryFn: async () => {
			const { data: res } = await GetById(id);
			console.log(res);
			return res;
		},
	});
	let { data: CategoryDetails } = useQuery({
		queryKey: ["category", product?.Category],
		queryFn: async () => {
			const { data: CategorybyId } = await GetCategoryId(product?.Category);
			console.log(CategorybyId);
			return CategorybyId.category;
		},
	});

	return (
		!isLoading && (
			<Container>
				<section className="productDetails px-4 py-10">
					<Header>Product Details:</Header>
					<div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 ">
						<div className="productDetails--image flex justify-center">
							{isLoading ? (
								<p>Loading...</p>
							) : (
								<img
									src={`http://localhost:8080/${product?.image}`}
									alt="product"
									className="w-96 h-[450px] object-cover rounded-lg shadow-md"
								/>
							)}
						</div>

						<div className="productDetails--content space-y-4 mt-5">
							<h4 className="text-2xl font-semibold font-new-amsterdam text-gray-800">
								{product?.name}
							</h4>

							<div className="text-3xl font-new-amsterdam font-semibold text-primary-600">
								{product?.price} EGP
							</div>
							<div className="text-xl font-Changa font-semibold">
								{product?.quantity} piece
							</div>

							<div className="flex space-x-4 items-center">
								<span className="text-base font-medium text-custom-green-800">
									Available Colors:
								</span>
								{product?.colors?.map((color) => (
									<div
										key={color.hexValue}
										className="w-6 h-6 rounded-full"
										style={{ backgroundColor: color.hexValue }}
										title={color.colorName}
									></div>
								))}
							</div>

							<div className="text-base font-medium text-custom-green-800">
								Size:
								<span className="text-xl ml-1 text-custom-green-500">
									{product?.sizes?.map((size) => size.sizeName).join(", ")}
								</span>
							</div>

							<div className="text-base font-medium text-custom-green-800">
								Category:
								<span className="text-custom-green-500 mx-1">
									{CategoryDetails?.name}
								</span>
							</div>
						</div>
					</div>
				</section>
			</Container>
		)
	);
};

export default OneProduct;
