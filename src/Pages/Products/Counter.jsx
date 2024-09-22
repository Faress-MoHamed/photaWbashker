import React, { useReducer } from "react";
import { useTranslation } from "react-i18next";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const initialState = { count: 0 };

function reducer(state, action) {
	switch (action.type) {
		case "increment":
			return {
				count: state.count + 1 <= action.max ? state.count + 1 : state.count,
			};
		case "decrement":
			return {
				count: state.count - 1 >= 0 ? state.count - 1 : state.count,
			};
		default:
			throw new Error();
	}
}

const Counter = ({ max, name, color }) => {
	const phoneNumber = import.meta.env.REACT_PHONE_NUMBER;
	const { t, i18n } = useTranslation();
	const currentLanguage = i18n.language;
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleOrderNow = () => {
		// const message = `Hello, I would like to order ${state.count} products.`;
		const messageArabic = `السلام عليكم، أرغب في طلب ${state.count} من ${name} باللون ${color}.`;
		const messageEnglish = `Hello, I would like to order ${state.count} ${name} in ${color} color.`;
		const whatsappUrl = `https://wa.me/+2${phoneNumber}?text=${encodeURIComponent(currentLanguage === "ar" ? messageArabic : messageEnglish)}`;
		window.open(whatsappUrl, "_blank");
	};

	return (
		<div className={`flex flex-col gap-7 w-full `}>
			<div className="flex items-center gap-4 rtl:flex-row-reverse rtl:justify-end">
				<button
					onClick={() => dispatch({ type: "decrement" })}
					disabled={state.count === 0}
					className={` py-2 rounded-lg text-custom-green-600 ${
						state.count === 0 && "opacity-50 cursor-not-allowed"
					}`}
				>
					<CiCircleMinus className="w-10 h-10" />
				</button>
				<span className="text-2xl font-new-amsterdam">{state.count}</span>
				<button
					onClick={() => dispatch({ type: "increment", max })}
					disabled={state.count === max}
					className={` py-2 rounded-lg text-custom-green-600  ${
						state.count === max && "opacity-50 cursor-not-allowed"
					}`}
				>
					<CiCirclePlus className="w-10 h-10" />
				</button>
			</div>
			<button
				onClick={handleOrderNow}
				disabled={state.count === 0}
				className={`px-6 py-2 bg-primary-800 text-white rounded-lg ${state.count !== 0 && "hover:bg-custom-green-800 duration-300"} transition ${
					state.count === 0 && "opacity-50  cursor-not-allowed"
				} md:w-[250px] w-[200px]`}
			>
				{t("oneProduct.orderNow")}
			</button>
		</div>
	);
};

export default Counter;
