import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
// import { useContext } from "react";
// import { MobileHandlerContext } from "../../utils/mobileHandler";

function Hero() {
	// const { isMobile } = useContext(MobileHandlerContext);
	const { t, i18n } = useTranslation();
	let currentLang = i18n.language;
	return (
		<main
			className={`${i18n.language === "ar" ? "font-Changa" : "font-new-amsterdam"}`}
			id="Hero"
		>
			<div
				className={`md:bg-[url(./logo/banner.jpg)] bg-[url(./logo/logo.jpg)] w-full md:h-screen bg-center h-[70vh] bg-no-repeat bg-contain md:bg-cover relative ${currentLang === "ar" ? "justify-end text-right" : "justify-start text-left"} md:text-base text-sm flex items-center `}
			>
				<div
					className={`${currentLang === "ar" ? "bg-gradient-to-l items-end" : "bg-gradient-to-r items-start"} from-black/90 to-black/0 h-full md:w-3/5 w-full flex flex-col justify-center px-10 `}
				>
					<motion.h5
						initial={{ opacity: 0, y: 100 }}
						transition={{
							duration: 1,
							type: "Tween",

							ease: [0.17, 0.55, 0.55, 1],
						}}
						animate={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className={`${currentLang === "ar" ? "font-medium" : "font-new-amsterdam"} 2xl:text-4xl  uppercase text-primary-700 md:text-3xl min-[400px]:text-4xl text-3xl my-2 `}
					>
						{t("hero.welcome")}
						<br />
					</motion.h5>
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
						className="pt-4 text-xl min-h-[200px]  md:max-w-[600px] mb-8 text-white/70 min-[400px]:text-lg"
					>
						{t("hero.description")}
						<br />
						{currentLang === "ar" && <br />}
						{t("hero.newLine")}
					</motion.p>
					<Link
						className={`font-Josefin-Sans md:w-2/4 w-full main-button !px-4 !py-2 text-center  !border-4  border-primary-900 hover:bg-primary-900 !rounded-lg font-medium xl:text-xl text-lg cursor-pointer bg-primary-800 text-sky-50 transition-all duration-300  ${currentLang === "ar" && "justify-end"} `}
						to={"AboutUs"}
						spy={true}
						smooth={true}
						hashSpy={true}
						offset={0}
						duration={500}
						isDynamic={true}
					>
						{t("hero.buttons.button1")}
					</Link>
				</div>
			</div>
		</main>
	);
}

export default Hero;
