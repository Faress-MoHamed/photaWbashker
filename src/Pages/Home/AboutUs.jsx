import { useContext } from "react";
import { MobileHandlerContext } from "../../utils/mobileHandler";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';

function AboutUs() {
	const { isMobile } = useContext(MobileHandlerContext);
	const { t, i18n } = useTranslation();
	const currentLang = i18n.language;
	return (
		<main id="AboutUs" className="md:h-[97vh] pt-6">
			<Container>
				<Header>{t("headers.aboutus")}</Header>
				<p
					className={`${currentLang === "ar" && "text-right"} mb-12 md:text-lg text-gray-500 md:px-0 px-7`}
				>
					{t("visionSubHeader")}
				</p>
				<div
					className={`${currentLang === "ar" && "flex-row-reverse text-right"} flex justify-between md:items-center gap-5 h-[80%] md:px-0 px-5`}
				>
					<div className={` ${!isMobile ? "w-2/4" : "w-full"}`}>
						{/* <span className="mb-4 block text-lg font-medium text-primary-500 md:text-[22px]">
							{t("aboutUs.headline")}
						</span> */}
						<h2 className="mb-4 text-lg font-medium text-primary-500 sm:text-4xl md:text-[44px] md:leading-tight">
							{t("aboutUs.title")}
						</h2>
						<div className="mb-[30px] text-base leading-relaxed text-black">
							<motion.p
								initial={{ opacity: 0, y: 100 }}
								transition={{
									duration: 1,
									type: "Tween",
									bounce: 0.3,
									ease: [0.17, 0.55, 0.55, 1],
								}}
								animate={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className={`pt-4 text-xl min-h-[200px]  md:max-w-[600px] mb-8 font-Changa font-normal min-[400px]:text-lg`}
							>
								{t("mission")}
								{/* <br />
						{currentLang === "ar" && <br />}
						{t("hero.newLine")} */}
							</motion.p>
						</div>
					</div>
					{!isMobile && (
						<div className="image w-[350px] h-[350px] max-w-full">
							<img src="/logo/logo.jpg" alt="aboutus" />
						</div>
					)}
				</div>
			</Container>
		</main>
	);
}

export default AboutUs;
