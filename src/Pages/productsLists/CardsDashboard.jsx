import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function CardsDashboard({ product, isLoading }) {
	const { t, i18n } = useTranslation();
	const currentLanguage = i18n.language;
	const API_URL = import.meta.env.REACT_API_URL;

	return (
		<Link
			dir={currentLanguage === "ar" ? "rtl" : "ltr"}
			to={`/Products/${product._id}`}
			className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl duration-150"
			key={product._id}
		>
			<img
				src={`${API_URL}/${product?.image}`}
				alt={product.name}
				className="w-40 h-40 object-cover rounded-full mb-4 shadow-md"
			/>
			<h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
			<p className="text-gray-600 mt-2">
				{t("oneProduct.piece")}: {product?.quantity}
			</p>
			<p className="text-gray-600">
				{t("oneProduct.price")}: EGP{product?.price}
			</p>
			<p className="text-gray-600">
				{t("oneProduct.color")}:{" "}
				{product?.colors.map((color) => color.colorName).join(", ")}
			</p>
			<p className="text-gray-600">
				{t("oneProduct.size")}:{" "}
				{product?.sizes.map((size) => size.sizeName).join(", ")}
			</p>
			<p className="text-gray-600">
				{t("oneProduct.category")}: {product?.Category?.name}
			</p>
		</Link>
	);
}

export default CardsDashboard;
