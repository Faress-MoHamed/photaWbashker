import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrbitProgress } from "react-loading-indicators";
import { Helmet } from "react-helmet";
import { fetchReviews } from "../../API/EndPointsReviews";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import ReviewForm from "./ReviewForm";
import ReviewCardDashboard from "./ReviewCardDashboard"; // Assuming you have a component to display reviews
import { useTranslation } from "react-i18next";

const ReviewList = () => {
	const { t } = useTranslation(); // Initialize the translation function

	// State to hold review data
	const [reviewsResult, setReviews] = useState([]);
	const [editReviewId, setEditReviewId] = useState(null);
	const [reviewFormData, setReviewFormData] = useState({
		clientName: "",
		reviewBody: "",
		rating: 0,
	});
	// Fetching reviews using React Query
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
		const onSuccess = () => {
			if (reviewsSuccess) {
				setReviews(reviews);
			}
		};
		const onError = () => {
			if (reviewsIsError) {
				// Handle error
				console.log(errorReviews);
			}
		};
		onSuccess();
		onError();
	}, [reviews, reviewsSuccess, reviewsIsError, errorReviews, reviewsResult]);

	return (
		<>
			<Helmet>
				<title>Review.</title>
				<meta name="description" content="List of reviews" />
			</Helmet>
			<Container>
				<Header>{t("dashboard.headers.reviewList")}</Header>
				<ReviewForm
					setReviewFormData={setReviewFormData}
					reviewFormData={reviewFormData}
					editReviewId={editReviewId}
					setEditReviewId={setEditReviewId}
				/>
				<div className="grid relative grid-cols-1 min-h-[450px] gap-6 p-6 bg-black/10 md:grid-cols-2 lg:grid-cols-3 rounded-lg shadow-md mt-10">
					{loadingReviews ? (
						<div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
							<OrbitProgress
								variant="track-disc"
								speedPlus="2"
								easing="ease-in-out"
								color={["#7AA486"]}
							/>
						</div>
					) : !reviews || reviews.length === 0 ? (
						<p>No reviews to display</p>
					) : (
						reviewsResult?.map((review) => (
							<ReviewCardDashboard
								key={review._id}
								setEditReviewId={setEditReviewId}
								setFormData={setReviewFormData}
								// reviewBody={review.reviewBody}
								// rating={review.rating}
								// clientName={review.clientName}
								review={review}
							/>
						))
					)}
				</div>
			</Container>
		</>
	);
};

export default ReviewList;
