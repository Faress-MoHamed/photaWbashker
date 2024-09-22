import { motion } from "framer-motion";

function ServicesCard({ Category, index }) {
	// const { i18n } = useTranslation();
	// const currentLang = i18n.language;
	const API_URL = import.meta.env.REACT_API_URL;

	return (
		<motion.a
			aria-label={Category?.name}
			href={`Products?category=${Category?._id}`}
			initial={{ x: 1000, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 1.5, delay: index * 0.3, type: "spring" }}
			className="relative rounded-md  md:w-[250px] md:h-[250px] w-[150px] h-[150px]"
		>
			<span
				className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-custom-green-600 rounded-md`}
			></span>{" "}
			<div
				role="button"
				className="relative shadow-2xl rounded-md bg-white flex flex-col h-full w-full justify-evenly items-center transition-transform transform hover:-translate-y-1  duration-300"
			>
				<div className="box rounded-md flex items-center w-[60%] ">
					<img
						className="w-full rounded-md"
						src={`${API_URL}/${Category?.image}`}
						alt={Category.name}
					/>
				</div>
				<p className="text-lg font-semibold capitalize">{Category.name}</p>
			</div>
		</motion.a>
	);
}

export default ServicesCard;
