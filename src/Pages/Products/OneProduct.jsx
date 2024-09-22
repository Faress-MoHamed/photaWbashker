import { useQuery } from "@tanstack/react-query";
import { GetById, GetCategoryId } from "../../API/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Container from "../../Components/Container";
import Counter from "./Counter";
import { useTranslation } from "react-i18next";

const OneProduct = () => {
	const { id } = useParams();
	const { i18n, t } = useTranslation();
	const currentLanguage = i18n.language;
	const API_URL = import.meta.env.REACT_API_URL;

	let { isLoading, data: product } = useQuery({
		queryKey: ["products", id],
		queryFn: async () => {
			const { data: res } = await GetById(id);
			return res;
		},
	});
	let { data: CategoryDetails } = useQuery({
		queryKey: ["category", product?.Category],
		queryFn: async () => {
			const { data: CategorybyId } = await GetCategoryId(product?.Category);
			return CategorybyId.category;
		},
	});
	const [selectedColor, setSelectedColor] = useState(null);

	useEffect(() => {
		if (product?.colors?.length) {
			setSelectedColor(product.colors[0].colorName);
		}
	}, [product]);

	const handleColorSelect = (color) => {
		setSelectedColor((e) => {
			if (e === color) {
				return null;
			} else {
				return color;
			}
		});
	};

	return (
		!isLoading && (
			<Container>
				<section className="productDetails px-4 py-10">
					<Header>{t("headers.ProductDetails")}</Header>
					<div
						className={`container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 ${currentLanguage === "ar" && "text-right"}`}
					>
						<div className="productDetails--image flex justify-center">
							<img
								src={`${API_URL}/${product?.image}`}
								alt="product"
								className="w-96 h-[450px] object-cover rounded-lg shadow-md"
							/>
						</div>

						<div
							dir={currentLanguage === "ar" ? "rtl" : "ltr"}
							className="productDetails--content space-y-4 mt-5"
						>
							<h4 className="text-2xl font-semibold font-new-amsterdam text-gray-800">
								{product?.name}
							</h4>

							<div className="text-3xl font-new-amsterdam font-semibold text-primary-600">
								{product?.price} EGP
							</div>
							<div className="text-xl font-Changa font-semibold">
								{product?.quantity} {t("oneProduct.piece")}
							</div>

							<div
								dir={currentLanguage === "ar" ? "rtl" : "ltr"}
								className={`flex space-x-4 gap-3 items-center`}
							>
								<span className="text-base font-medium text-custom-green-800 ">
									{t("oneProduct.color")}:
								</span>
								{product?.colors?.map((color) => (
									<button
										key={color.hexValue}
										className={`w-6 h-6 rounded-full border-2 ${
											selectedColor === color.colorName
												? "border-black"
												: "border-transparent"
										}`}
										style={{ backgroundColor: color.hexValue }}
										title={color.colorName}
										onClick={() => handleColorSelect(color.colorName)}
									></button>
								))}
							</div>
							{selectedColor && (
								<div className="text-sm text-gray-500">
									Selected color: {selectedColor}
								</div>
							)}

							<div className="text-base font-medium text-custom-green-800">
								{t("oneProduct.size")}:
								<span className="text-xl mx-1 text-custom-green-500">
									{product?.sizes?.map((size) => size.sizeName).join(", ")}
								</span>
							</div>

							<div className="text-base font-medium text-custom-green-800">
								{t("oneProduct.category")}:
								<span className="text-custom-green-500 mx-1">
									{CategoryDetails?.name}
								</span>
							</div>

							<Counter
								max={product?.quantity}
								name={product.name}
								color={selectedColor || "لم اختر اللون بعد"}
							/>
						</div>
					</div>
				</section>
			</Container>
		)
	);
};

export default OneProduct;
