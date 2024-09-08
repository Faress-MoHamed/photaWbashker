import { useTranslation } from "react-i18next";

function Header({ children }) {
	const { i18n } = useTranslation();
	const currentLang = i18n.language;
	return (
		<div
			className={` flex font-playwrite w-full flex-col md:gap-7 gap-3 md:items-center mb-10 xl:px-0 md:px-6  px-5 ${currentLang === "ar" ? "md:flex-row-reverse text-right" : "md:flex-row"}`}
		>
			<h2 className="text-primary-700 lg:text-4xl text-2xl  font-bold">
				{children}
			</h2>
			<div className="h-[2px] md:w-6/12 w-11/12 bg-primary-700"></div>
		</div>
	);
}

export default Header;
