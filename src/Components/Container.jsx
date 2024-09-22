import { useTranslation } from "react-i18next";

function Container({ children }) {
	const { i18n } = useTranslation(); // Initialize the translation function
	const currentLanguage = i18n.language;
	return (
		<div
			className={`container ${currentLanguage === "ar" ? "font-Changa" : ""} lg:w-4/5 w-full mx-auto bg-white md:mt-10 mt-5 h-full`}
		>
			{children}
		</div>
	);
}

export default Container;
