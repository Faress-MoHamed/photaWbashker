import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrbitProgress } from "react-loading-indicators";
import toast from "react-hot-toast";
import { DeleteReview } from "../../API/EndPointsReviews"; // Assume you have this API function
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";

const ReviewCardDashboard = ({ review, setEditReviewId, setFormData }) => {
	const queryClient = useQueryClient();
	const { t, i18n } = useTranslation();
	const currentLanguage = i18n.language;

	const resetForm = () => {
		setFormData({
			clientName: "",
			reviewBody: "",
			rating: 0,
		});
	};
	
	const { mutate: handleDelete } = useMutation({
		mutationKey: ["reviews", "deleteReview"],
		mutationFn: async (reviewId) => {
			try {
				const res = await DeleteReview(reviewId);
				return res;
			} catch (error) {
				toast.error(t("error.deletingReview"));
			}
		},
		onSuccess: (res) => {
			queryClient.invalidateQueries(["reviews"]);
			resetForm();
			setEditReviewId(null);
			toast.success(res?.message || t("reviewDeleted"), {
				icon: "👍",
				className: "border-1 border-primary-500",
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleEdit = (review) => {
		setEditReviewId(review._id);
		setFormData({
			clientName: review.clientName,
			reviewBody: review.reviewBody,
			rating: review.rating,
		});
	};

	return (
		<main
			className={`flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-lg ${currentLanguage === "ar" && "text-right"}`}
			dir={currentLanguage === "ar" ? "rtl" : "ltr"}
			key={review._id}
		>
			<img
				src={`/logo/logo.jpg`}
				alt={"clientName img"}
				className="w-16 h-16 object-cover rounded-full mb-4 shadow-md"
			/>
			<h2 className="text-2xl font-semibold text-gray-800">
				{review.clientName}
			</h2>
			<div className="flex mb-2">
				{Array(review.rating)
					.fill()
					.map((_, i) => (
						<FaStar key={i} className="text-yellow-400 text-3xl" />
					))}
			</div>
			<p className="text-gray-700 mt-2 text-center">{review.reviewBody}</p>
			<div className="mt-6 flex gap-4">
				<button
					onClick={() => handleEdit(review)}
					className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all"
				>
					{t("dashboard.reviewForm.review_Update_Btn")}
				</button>
				<button
					onClick={() => handleDelete(review._id)}
					className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
				>
					{t("dashboard.reviewForm.review_delete_Btn")}
				</button>
			</div>
		</main>
	);
};

export default ReviewCardDashboard;
