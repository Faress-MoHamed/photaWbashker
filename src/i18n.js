import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import arTranslate from "./locales/ar/translation.json";
import enTranslate from "./locales/en/translation.json";

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		supportedLngs: ["ar", "en"],
		fallbackLng: "ar",
		resources: {
			ar: {
				translation: arTranslate,
			},
			en: {
				translation: enTranslate,
			},
		},
		
		detection: {
			order: [
				"cookie",
				"htmlTag",
				"localStorage",
				"sessionStorage",
				"navigator",
				"path",
				"subdomain",
			],
			caches: ["cookie"],
		},
	});
export default i18n;
