import { Link } from "react-router-dom";
function HomeCards({ service }) {
	return (
		<Link
			aria-label={service?.name}
			to={`/${service?.name}`}
			initial={{ x: 1000, opacity: 0 }}
			className="relative rounded-md  md:w-[250px] md:h-[250px] w-[150px] h-[150px]"
		>
			<span
				className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-custom-green-600 rounded-md`}
			></span>{" "}
			<div
				role="button"
				className="relative shadow-2xl rounded-md bg-white flex flex-col h-full w-full justify-evenly items-center transition-transform transform hover:-translate-y-1  duration-300"
			>
				<p className="text-lg font-semibold capitalize">{service.title}</p>
			</div>
		</Link>
	);
}

export default HomeCards;
