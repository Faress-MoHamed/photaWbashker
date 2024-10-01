import { FaStar } from "react-icons/fa";

const ReviewCard = ({ clientName, rating, reviewBody }) => {
	return (
		<div className=" rounded-lg shadow-xl w-full h-[250px]  relative">
			<span
				className={`absolute top-0 left-0 w-full h-full m-1 bg-custom-green-600 rounded-md`}
			></span>{" "}
			<div className="relative rounded-md bg-white w-full h-full p-2 flex justify-evenly items-center flex-col  transition-transform transform hover:-translate-y-1  duration-300">
				<div className=" flex flex-col items-center justify-center text-center ">
					<img
						src="/logo/logo.jpg"
						alt="Client Icon"
						className="w-16 h-16 mb-3 rounded-full"
					/>
					<div className="flex flex-col justify-center items-center">
						<h3 className="text-lg font-semibold">{clientName}</h3>
						<div className="flex">
							{Array(rating)
								.fill()
								.map((_, i) => (
									<FaStar key={i} className="text-yellow-400 text-3xl" />
								))}
						</div>
					</div>
				</div>
				<p className="text-gray-700 text-center ">{reviewBody}</p>
			</div>
		</div>
	);
};

export default ReviewCard;
