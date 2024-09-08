import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function FaresDeveloper() {
	const { t, i18n } = useTranslation();
	return (
		<div className="flex justify-center items-center bg-customPurple-500">
			<div
				className={`${i18n.language === "ar" && "text-right flex-row-reverse"} flex  gap-3 font-bold text-white py-1`}
			>
				{t("developer.description")}
				<Link
					to={t("developer.website")}
					className="underline text-primary-100"
				>
					{t("developer.name")}
				</Link>
			</div>
		</div>
	);
}

export default FaresDeveloper;
