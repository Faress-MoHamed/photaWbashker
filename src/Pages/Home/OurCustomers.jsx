import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { MobileHandlerContext } from "../../utils/mobileHandler";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./swiper-slide.css";
import { Navigation, Scrollbar } from "swiper/modules";

// Generate a list of 400 customers for demonstration purposes
const generateCustomers = (num) =>
	Array.from({ length: num }, (_, i) => `customer ${i + 1}`);

function OurCustomers() {
	const { i18n, t } = useTranslation();
	const customers = generateCustomers(400);
	const { isMobile } = useContext(MobileHandlerContext);
	const [IsEnd, setIsEnd] = useState(false);
	const [IsStart, setIsStart] = useState(true);

	return (
		<main
			id="reviews"
			className={`${i18n.language === "ar" ? "font-Changa" : "font-new-amsterdam"} flex relative justify-center items-center`}
		>
			<Container>
				<Header>{t("headers.ourClints")}</Header>
				{isMobile && (
					<div className="px-4 w-full h-[4vh] mt-10 flex items-center gap-4 justify-between z-40">
						<div className="flex items-center w-full mb-9 justify-between cursor-pointer gap-4 z-30 ">
							<button
								disabled={IsStart}
								className={`left--arrow arrow w-12 h-12 rounded-full border-3 ${IsStart ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"} flex items-center justify-center transition ease-in-out duration-400 `}
							>
								<svg
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12.5757 19.895L11.4917 20.979C11.0327 21.438 10.2905 21.438 9.83643 20.979L0.344238 11.4917C-0.114746 11.0327 -0.114746 10.2905 0.344238 9.83643L9.83643 0.344238C10.2954 -0.114746 11.0376 -0.114746 11.4917 0.344238L12.5757 1.42822C13.0395 1.89209 13.0298 2.64893 12.5562 3.10303L6.67236 8.7085H20.7056C21.355 8.7085 21.8774 9.23096 21.8774 9.88037V11.4429C21.8774 12.0923 21.355 12.6147 20.7056 12.6147H6.67236L12.5562 18.2202C13.0347 18.6743 13.0444 19.4312 12.5757 19.895Z"
										fill="white"
										fillOpacity="1"
									/>
								</svg>
							</button>
							<button
								disabled={IsEnd}
								className={`right--arrow arrow w-12 h-12 rounded-full border-3 ${IsEnd ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"} flex items-center justify-center transition ease-in-out duration-400 `}
							>
								<svg
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9.30176 1.42822L10.3857 0.344236C10.8447 -0.114748 11.5869 -0.114748 12.041 0.344236L21.5332 9.83154C21.9922 10.2905 21.9922 11.0327 21.5332 11.4868L12.041 20.979C11.582 21.438 10.8398 21.438 10.3857 20.979L9.30176 19.895C8.83789 19.4312 8.84766 18.6743 9.32129 18.2202L15.2051 12.6147L1.17188 12.6147C0.522461 12.6147 0 12.0923 0 11.4429V9.88037C0 9.23096 0.522461 8.7085 1.17188 8.7085L15.2051 8.7085L9.32129 3.10303C8.84277 2.64892 8.83301 1.89209 9.30176 1.42822Z"
										fill="white"
									/>
								</svg>
							</button>
						</div>
					</div>
				)}
				<Swiper
					slidesPerView={1}
					breakpoints={{
						1440: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 1,
						},
						300: {
							slidesPerView: 1,
						},
					}}
					speed={500}
					spaceBetween={50}
					modules={[Navigation, Scrollbar]}
					navigation={{ nextEl: ".right--arrow", prevEl: ".left--arrow" }}
					scrollbar={{ el: ".swiper--progress", dragClass: ".drag" }}
					className="relative flex justify-center items-center h-full px-4 gap-11"
					onSlideChange={(swiper) => {
						setIsEnd(swiper.isEnd);
						setIsStart(swiper.isBeginning);
					}}
					wrapperClass="w-full h-full"
				>
					{Array.from(
						{ length: Math.ceil(customers.length / 50) },
						(_, slideIndex) => (
							<SwiperSlide key={slideIndex} className="grid grid-cols-5 gap-4">
								{customers
									.slice(slideIndex * 50, (slideIndex + 1) * 50)
									.map((customer, index) => (
										<div
											key={index}
											className="flex items-center text-sm justify-center p-2 border border-gray-200"
										>
											{customer}
										</div>
									))}
							</SwiperSlide>
						)
					)}
				</Swiper>
				{!isMobile && (
					<div className="sm:flex  w-full h-[4vh] mt-10  items-center gap-4 justify-between  z-40">
						<div className="swiper--progress w-full h-1 rounded-full bg-black/30"></div>

						<div className="flex items-center cursor-pointer gap-4 z-30 ">
							<button
								disabled={IsStart}
								className={`left--arrow arrow w-12 h-12 rounded-full border-3 ${IsStart ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"}  flex items-center justify-center transition ease-in-out duration-400 `}
							>
								<svg
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12.5757 19.895L11.4917 20.979C11.0327 21.438 10.2905 21.438 9.83643 20.979L0.344238 11.4917C-0.114746 11.0327 -0.114746 10.2905 0.344238 9.83643L9.83643 0.344238C10.2954 -0.114746 11.0376 -0.114746 11.4917 0.344238L12.5757 1.42822C13.0395 1.89209 13.0298 2.64893 12.5562 3.10303L6.67236 8.7085H20.7056C21.355 8.7085 21.8774 9.23096 21.8774 9.88037V11.4429C21.8774 12.0923 21.355 12.6147 20.7056 12.6147H6.67236L12.5562 18.2202C13.0347 18.6743 13.0444 19.4312 12.5757 19.895Z"
										fill="white"
										fillOpacity="1"
									/>
								</svg>
							</button>
							<button
								disabled={IsEnd}
								className={`right--arrow arrow w-12 h-12 rounded-full border-3 ${IsEnd ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"} flex items-center justify-center transition ease-in-out duration-400 `}
							>
								<svg
									width="22"
									height="22"
									viewBox="0 0 22 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9.30176 1.42822L10.3857 0.344236C10.8447 -0.114748 11.5869 -0.114748 12.041 0.344236L21.5332 9.83154C21.9922 10.2905 21.9922 11.0327 21.5332 11.4868L12.041 20.979C11.582 21.438 10.8398 21.438 10.3857 20.979L9.30176 19.895C8.83789 19.4312 8.84766 18.6743 9.32129 18.2202L15.2051 12.6147L1.17188 12.6147C0.522461 12.6147 0 12.0923 0 11.4429V9.88037C0 9.23096 0.522461 8.7085 1.17188 8.7085L15.2051 8.7085L9.32129 3.10303C8.84277 2.64892 8.83301 1.89209 9.30176 1.42822Z"
										fill="white"
									/>
								</svg>
							</button>
						</div>
					</div>
				)}
			</Container>
		</main>
	);
}

export default OurCustomers;
