import { useContext } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MobileHandlerContext } from "../utils/mobileHandler";
import { useTranslation } from "react-i18next";

function WhatsApp() {
	const { isMobile } = useContext(MobileHandlerContext);
	const { t } = useTranslation();

	return (
		<>
			<Link
				to={"https://wa.me/+201508096373"}
				className={`fixed  bottom-[24px] left-[24px] flex items-center gap-5 z-50`}
			>
				<div className="w-[60px] h-[60px] whatsAppIcon rounded-full bg-[#25d366] flex justify-center items-center  shadow-[2px_2px_3px_#2d2d2d]">
					<FaWhatsapp className="text-[40px] text-white" />
				</div>
				{!isMobile && (
					<div className="whatsapptext text-[18px] rounded-[17px] bg-[#25d366] p-[10px] text-white shadow-[2px_2px_3px_#2d2d2d]">
						{t("whatsapp")}
					</div>
				)}
			</Link>
		</>
	);
}

export default WhatsApp;
