import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReviewCard from "../../Components/ReviewCard";
import { useContext, useEffect, useRef, useState } from "react";
import { MobileHandlerContext } from "../../utils/mobileHandler";
import Container from "../../Components/Container";
import "./swiper-slide.css";
import { useTranslation } from "react-i18next";
import Header from "../../Components/Header";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { Navigation, Scrollbar } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "../../API/EndPointsReviews";

const Reviews = () => {
	const { i18n, t } = useTranslation();
	const { isMobile } = useContext(MobileHandlerContext);
	const [IsEnd, setIsEnd] = useState(false);
	const [IsStart, setIsStart] = useState(true);
	const [reviewsResult, setReviews] = useState([]);
	const swiperRef = useRef(null); // Create a ref for the Swiper

	const {
		data: reviews,
		isError: reviewsIsError,
		isLoading: loadingReviews,
		isSuccess: reviewsSuccess,
		error: errorReviews,
	} = useQuery({
		queryKey: ["reviews"],
		queryFn: async () => {
			try {
				const res = await fetchReviews();
				return res;
			} catch (error) {
				console.log("error in getting reviews");
			}
		},
	});

	useEffect(() => {
		if (reviewsSuccess) {
			setReviews(reviews);
		}
		if (reviewsIsError) {
			console.log(errorReviews);
		}
	}, [reviews, reviewsSuccess, reviewsIsError, errorReviews]);

	const shouldDisableSwiper = reviewsResult.length < 3 && !isMobile;

	useEffect(() => {
		if (swiperRef.current) {
			const swiper = swiperRef.current.swiper; // Access the Swiper instance

			setIsStart(swiper.isBeginning);
			setIsEnd(swiper.isEnd);

			// Optional: You can also add an event listener to update these states
			swiper.on("slideChange", () => {
				setIsStart(swiper.isBeginning);
				setIsEnd(swiper.isEnd);
			});
		}
	}, [swiperRef]);

	return (
		<main
			id="reviews"
			className={`${i18n.language === "ar" ? "font-Changa" : "font-new-amsterdam"} h-[60vh] flex fle relative justify-center items-center`}
		>
			<Container>
				<Header>{t("headers.clientReviews")}</Header>
				{isMobile && (
					<div className="px-4 w-full h-[4vh] mt-10 flex items-center gap-4 justify-between z-40">
						<div className="flex items-center w-full mb-9 justify-between cursor-pointer gap-4 z-30">
							<button disabled={IsStart}>
								<FaArrowCircleLeft
									className={`left--arrow arrow w-12 h-12 text-white rounded-full border-3 ${IsStart ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"} flex items-center justify-center transition ease-in-out duration-400`}
								/>
							</button>
							<button disabled={IsEnd}>
								<FaArrowCircleRight
									className={`right--arrow arrow w-12 h-12 text-white rounded-full border-3 ${IsEnd ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"} flex items-center justify-center transition ease-in-out duration-400`}
								/>
							</button>
						</div>
					</div>
				)}
				<Swiper
					ref={swiperRef} // Attach the ref here
					slidesPerView={3}
					breakpoints={{
						1440: {
							slidesPerView: 3,
							spaceBetween: 20,
						},
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
					pagination={!shouldDisableSwiper ? { clickable: true } : false}
					modules={[Navigation, Scrollbar]}
					navigation={
						!shouldDisableSwiper
							? {
									nextEl: ".right--arrow",
									prevEl: ".left--arrow",
									draggable: true,
								}
							: false
					}
					scrollbar={{ el: ".swiper--progress", dragClass: "drag" }}
					className="relative flex justify-center items-center h-full px-4"
					wrapperClass="w-full h-full"
				>
					{reviewsResult.map((review, index) => (
						<SwiperSlide key={index} className="flex items-center">
							<ReviewCard
								clientName={review.clientName}
								rating={review.rating}
								reviewBody={review.reviewBody}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				{!isMobile && reviewsResult.length > 3 && (
					<div className="sm:flex w-full h-[4vh] mt-10 items-center gap-4 justify-between pb-20 z-40">
						<div className="swiper--progress w-full h-1 rounded-full bg-slate-300"></div>
						<div className="flex items-center cursor-pointer gap-4 z-30">
							<button disabled={IsStart}>
								<FaArrowCircleLeft
									className={`left--arrow arrow w-12 h-12 text-white rounded-full border-3 ${IsStart ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"} flex items-center justify-center transition ease-in-out duration-400`}
								/>
							</button>
							<button disabled={IsEnd}>
								<FaArrowCircleRight
									className={`right--arrow arrow w-12 h-12 text-white rounded-full border-3 ${IsEnd ? "bg-black/30 border-black/10" : "bg-primary-500 border-primary-500"} flex items-center justify-center transition ease-in-out duration-400`}
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
