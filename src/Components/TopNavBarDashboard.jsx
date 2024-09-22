import { useContext } from "react";
import { FaTiktok } from "react-icons/fa";
import { SlSocialGoogle, SlSocialInstagram } from "react-icons/sl";
import { TiSocialFacebook } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { MobileHandlerContext } from "../utils/mobileHandler";
import { IoMenu } from "react-icons/io5";
import LogoutButton from "./LogoutButton";
import { useTranslation } from "react-i18next";

const socialMediaAccounts = {
	faceBook: "https://www.facebook.com/fotawbashker?mibextid=kFxxJD",
	instagram: "https://www.instagram.com/fota.bashker?igsh=MWJqdnN2MG9qeHFseA==",
	google: "mailto:fotawbashkeer@gmail.com",
	tel: "tel:+201118249382",
};
function TopNavBarDashboard({ setOpen }) {
	const navigate = useNavigate();

	const { isMobile } = useContext(MobileHandlerContext);
		const { i18n } = useTranslation();
		const changeToArabic = () => {
			i18n.changeLanguage("ar");
		};
		const changeToEnglish = () => {
			i18n.changeLanguage("en");
		};
	return (
		<div className="border-b-[1px] border-b-black/10 sticky top-0 bg-white z-[20]">
			<div className="container lg:w-3/5 w-5/6 mx-auto py-2 p-1 bg-white">
				<nav className="flex justify-between mx-auto items-center bg-white">
					<div className="social-Media-Side flex gap-5 items-center">
						<div className="item  ">
							<Link target="_blank" to={socialMediaAccounts.tikTok}>
								<FaTiktok className="text-primary-700" />
							</Link>
						</div>
						<div className="item  ">
							<Link target="_blank" to={socialMediaAccounts.instagram}>
								<SlSocialInstagram className="text-primary-700" />
							</Link>
						</div>
						<div className="item  ">
							<Link target="_blank" to={socialMediaAccounts.google}>
								<SlSocialGoogle className="text-primary-700" />
							</Link>
						</div>
						<div className="item  ">
							<Link target="_blank" to={socialMediaAccounts.faceBook}>
								<TiSocialFacebook className="text-primary-700 text-2xl" />
							</Link>
						</div>
					</div>
					<div
						className={`Language-Side ${
							isMobile
								? "flex items-center justify-between w-3/5 "
								: "flex w-1/5 justify-between"
						} `}
					>
						{localStorage.getItem("token") && <LogoutButton />}
						<button
							onClick={() =>
								i18n.language === "ar" ? changeToEnglish() : changeToArabic()
							}
							className="focus:outline-none focus:border-none text-black hover:text-black/50 duration-300 transition-colors hover:bg-black/30 rounded-[2px] bg-black/10 md:px-[5px] px-1 py-[1px]"
						>
							{i18n.language === "ar" ? "English" : "عربي"}
						</button>
						{isMobile && (
							<button onClick={() => setOpen(true)} className="flex ">
								<IoMenu className="text-3xl" />
							</button>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
}

export default TopNavBarDashboard;
