import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MobileHandlerContext } from "../utils/mobileHandler";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function NavBar({ open, setOpen }) {
	const { isMobile } = useContext(MobileHandlerContext);
	const [currentPath, setCurrentPath] = useState(
		window.location.pathname.slice(1)
	);

	const { i18n, t } = useTranslation();
	const navLinks = [
		{
			id: 0,
			name: t("navbar.home"),
			link: "/",
		},
		{
			id: 1,
			name: t("navbar.Products"),
			link: "/Products",
		},
		{
			id: 2,
			name: t("navbar.contactUs"),
			link: "/ContactUs",
		},
	];
	const navLinksMobile = [
		{
			id: 0,
			name: t("navbar.home"),
			link: "/",
		},
		{
			id: 1,
			name: t("navbar.Products"),
			link: "/Products",
		},
		{
			id: 2,
			name: t("navbar.contactUs"),
			link: "/ContactUs",
		},
	];

	const controls = useAnimation();
	const location = useLocation();

	useEffect(() => {
		setCurrentPath(location.pathname.slice(1));
	}, [location.pathname]);

	useEffect(() => {
		if (open) {
			controls.start({ x: 0, opacity: 1 });
		} else {
			controls.start({ x: -100, opacity: 0 });
		}
	}, [open, controls]);

	function handleClose() {
		setOpen((e) => !e);
	}

	return (
		<>
			{/*sticky top-0 */}
			<div className="container lg:w-4/5 w-full mx-auto bg-white">
				<nav
					className={`flex ${i18n.language === "ar" && "flex-row-reverse"} items-center ${isMobile ? "justify-center" : "justify-between"}  lg:px-6 px-4 py-2 text-primary-900`}
				>
					<Link
						className={`w-[200px] flex  ${i18n.language === "ar" && "flex-row-reverse"}  ${isMobile ? "flex-col gap-4" : "flex-row"} justify-center items-center`}
						to={"/"}
					>
						<img className="w-2/6" src="/logo/logo.jpg" alt="logo" />
					</Link>

					{!isMobile && (
						<ul
							className={`hidden items-center justify-between lg:flex ${i18n.language === "ar" && "flex-row-reverse"} lg:gap-4 lg:w-2/5`}
						>
							{navLinks.map((item) => {
								return (
									<motion.li
										initial={{ opacity: 0, y: -100 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: 0.2 * item.id,
											ease: [0.17, 0.55, 0.55, 1],
										}}
										key={item.id}
									>
										<NavLink
											to={`${item.link}`}
											onClick={() =>
												window.scrollTo({
													top: 0,
													behavior: "smooth",
												})
											}
											className={`cursor-pointer font-semibold relative  before:absolute before:bottom-[-5px] before:left-0 before:h-[2px] before:w-0 before:bg-primary-600 before:transition-all before:duration-300 hover:before:w-full capitalize ${
												currentPath === item.name ||
												window.location.pathname === item.link
													? "before:w-full"
													: ""
											}`}
										>
											{item.name}
										</NavLink>
									</motion.li>
								);
							})}
						</ul>
					)}
				</nav>
			</div>
			{
				<AnimatePresence>
					{open && isMobile && (
						<>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
								onClick={handleClose}
								className="left-0 top-0 h-full z-20 fixed inset-0 overflow-hidden bg-black bg-opacity-50"
							></motion.div>
							<motion.div
								initial={{ x: 100, opacity: 0 }}
								animate={open ? { opacity: 1, x: 0 } : {}}
								exit={{ x: 100, opacity: 0 }}
								transition={{ duration: 0.5 }}
								className={`fixed ${
									open ? "" : "hidden"
								} right-0 top-0 z-[999] w-[55%] lg:top-5`}
							>
								<ul
									className={`flex ${i18n.language === "ar" && "text-right items-end"} h-screen w-full flex-col items-start justify-start gap-10 bg-white p-3 backdrop-blur-lg lg:hidden`}
								>
									<button
										aria-label="clos sidebar"
										className="text-4xl text-black"
										onClick={() => handleClose()}
									>
										<IoClose />
									</button>
									{navLinksMobile.map((item, index) => {
										return (
											<motion.li
												initial={{ opacity: 0, x: 100 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													delay: 0.2 * item.id,
													ease: [0.17, 0.55, 0.55, 1],
												}}
												className={`relative  text-lg before:absolute before:bottom-[-5px] before:left-0 before:h-[3px] before:w-0 before:bg-slate-950 before:transition-all before:duration-300 hover:before:w-full ${
													currentPath === item.name ||
													window.location.pathname === item.link
														? "before:w-full"
														: ""
												}`}
												key={index}
											>
												<NavLink
													to={`${item.link}`}
													onClick={() => {
														handleClose();
													}}
													className="cursor-pointer capitalize"
												>
													{item.name}
												</NavLink>
											</motion.li>
										);
									})}
								</ul>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			}
		</>
	);
}

export default NavBar;
