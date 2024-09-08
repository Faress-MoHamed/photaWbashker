import { Link } from "react-router-dom";

function CardsDashboard({ product, isLoading }) {
	// console.log(product);
	return (
		<Link
			to={`/Products/${product._id}`}
			className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl duration-150"
			key={product._id}
		>
			<img
				src={`http://localhost:8080/${product?.image}`}
				alt={product.name}
				className="w-40 h-40 object-cover rounded-full mb-4 shadow-md"
			/>
			<h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
			<p className="text-gray-600 mt-2">Quantity: {product?.quantity}</p>
			<p className="text-gray-600">Price: ${product?.price}</p>
			<p className="text-gray-600">
				Colors: {product?.colors.map((color) => color.colorName).join(", ")}
			</p>
			<p className="text-gray-600">
				Sizes: {product?.sizes.map((size) => size.sizeName).join(", ")}
			</p>
			<p className="text-gray-600">Category: {product?.Category?.name}</p>
		</Link>
	);
}

export default CardsDashboard;
