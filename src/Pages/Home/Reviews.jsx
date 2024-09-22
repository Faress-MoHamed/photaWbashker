import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReviewCard from "../../Components/ReviewCard";
import { useContext, useState } from "react";
import { MobileHandlerContext } from "../../utils/mobileHandler";
import Container from "../../Components/Container";
import "./swiper-slide.css";
import { useTranslation } from "react-i18next";
import Header from "../../Components/Header";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { Navigation, Scrollbar } from "swiper/modules";
const Reviews = () => {
	const { i18n, t } = useTranslation();

	const reviews = [
		{
			icon: "path/to/icon1.png",
			review: "This is an amazing product!",
			stars: 5,
		},
		{
			icon: "path/to/icon2.png",
			review: "Really loved the service!",
			stars: 4,
		},
		{
			icon: "path/to/icon2.png",
			review: "Really loved the service!",
			stars: 4,
		},
		{
			icon: "path/to/icon2.png",
			review: "Really loved the service!",
			stars: 4,
		},
		{
			icon: "path/to/icon2.png",
			review: "Really loved the service!",
			stars: 4,
		},
		// Add more reviews here
	];

	const { isMobile } = useContext(MobileHandlerContext);
	const [IsEnd, setIsEnd] = useState(false);
	const [IsStart, setIsStart] = useState(true);

	return (
		<main
			id="reviews"
			className={`${i18n.language === "ar" ? "font-Changa" : "font-new-amsterdam"} h-[50vh]  flex fle relative justify-center items-center`}
		>
			<Container>
				<Header>{t("headers.clientReviews")}</Header>
				{isMobile && (
					<div className="px-4 w-full h-[4vh] mt-10  flex items-center gap-4 justify-between z-40">
						<div className="flex items-center w-full mb-9 justify-between cursor-pointer gap-4 z-30 ">
							<button disabled={IsStart}>
								<FaArrowCircleLeft
									className={`left--arrow arrow w-12 h-12 text-white rounded-full border-3 ${IsStart ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"}  flex items-center justify-center transition ease-in-out duration-400 `}
								/>
							</button>
							<button disabled={IsEnd}>
								<FaArrowCircleRight
									className={`right--arrow arrow w-12 h-12 text-white rounded-full border-3 ${IsEnd ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"} flex items-center justify-center transition ease-in-out duration-400 `}
								/>
							</button>
						</div>
					</div>
				)}
				<Swiper
					slidesPerView={3}
					// spaceBetween={50}
					breakpoints={{
						// when window width is >= 1440px
						1440: {
							slidesPerView: 3,
							spaceBetween: 20,
						},
						// when window width is >= 768px
						768: {
							slidesPerView: 2,
							spaceBetween: 30,
						},
						300: {
							slidesPerView: 1,
							spaceBetween: 40,
						},
					}}
					speed={500}
					pagination={{ clickable: true }}
					modules={[Navigation, Scrollbar]}
					navigation={{
						nextEl: ".right--arrow",
						prevEl: ".left--arrow",
						draggable: true,
					}}
					scrollbar={{ el: ".swiper--progress", dragClass: "drag" }}
					className="relative flex justify-center items-center h-full px-4"
					onSlideChange={(swiper) => {
						if (swiper.isEnd !== IsEnd) {
							setIsEnd(swiper.isEnd);
						}
						if (swiper.isBeginning !== IsStart) {
							setIsStart(swiper.isBeginning);
						}
					}}
					wrapperClass="w-full h-full"
				>
					{reviews.map((review, index) => (
						<SwiperSlide key={index} className="flex items-center">
							<ReviewCard
								icon={review.icon}
								review={review.review}
								stars={review.stars}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				{!isMobile && (
					<div className="sm:flex  w-full h-[4vh] mt-10  items-center gap-4 justify-between  z-40">
						<div className="swiper--progress w-full h-1 rounded-full bg-slate-300"></div>

						<div className="flex items-center cursor-pointer gap-4 z-30 ">
							<button disabled={IsStart}>
								<FaArrowCircleLeft
									className={`left--arrow arrow w-12 h-12 text-white rounded-full border-3 ${IsStart ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"}  flex items-center justify-center transition ease-in-out duration-400 `}
								/>
							</button>
							<button disabled={IsEnd}>
								<FaArrowCircleRight
									className={`right--arrow arrow w-12 h-12 text-white rounded-full border-3 ${IsEnd ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"} flex items-center justify-center transition ease-in-out duration-400 `}
								/>
							</button>
						</div>
					</div>
				)}
			</Container>
		</main>
	);
};

export default Reviews;
