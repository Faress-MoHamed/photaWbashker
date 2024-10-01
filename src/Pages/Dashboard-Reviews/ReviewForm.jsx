import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { AddReview, UpdateReview } from "../../API/EndPointsReviews";
import { useTranslation } from "react-i18next";
import StarRating from "./StarRating"; // Import StarRating component

function ReviewForm({
	editReviewId,
	setEditReviewId,
	reviewFormData,
	setReviewFormData,
}) {
	const { t, i18n } = useTranslation();
	const currentLanguage = i18n.language;
	const queryClient = useQueryClient();
	const { setIsloading } = useLoading();

	const resetForm = () => {
		formik.resetForm();
		setReviewFormData(() => {
			return {
				clientName: "",
				reviewBody: "",
				rating: 0,
			};
		});
	};
	useEffect(() => {
	}, [reviewFormData]);
	// Add Review mutation
	const { mutate: addReview, isLoading: isAdding } = useMutation({
		mutationKey: ["reviews", "newReview"],
		mutationFn: async (data) => {
			try {
				await AddReview(data);
			} catch (error) {
				toast.error("Error in adding review");
			}
		},
		onSuccess: (res) => {
			queryClient.invalidateQueries(["reviews"]);
			resetForm();
			setEditReviewId(null);
			setIsloading(false);
			toast(res?.message || "Review Added successfully", {
				icon: "👍",
				className: "border-1 border-primary-500",
			});
		},
		onError: (error) => {
			console.error(
				"Error adding review:",
				error.response?.data || error.message
			);
		},
	});

	// Update Review mutation
	const { mutate: updateReview, isLoading: isUpdating } = useMutation({
		mutationKey: ["reviews", "editReview"],
		mutationFn: async (data) => {
			try {
				await UpdateReview(editReviewId, data);
			} catch (error) {
				toast.error("Error in updating review");
			}
		},
		onSuccess: (res) => {
			queryClient.invalidateQueries(["reviews"]);
			resetForm();
			setEditReviewId(null);
			setIsloading(false);
			toast(res?.message || "Review updated successfully", {
				icon: "👍",
				className: "border-1 border-primary-500",
			});
		},
		onError: (error) => {
			console.error(
				"Error updating review:",
				error.response?.data || error.message
			);
		},
	});

	useEffect(() => {
		if (isAdding || isUpdating) {
			setIsloading(true);
		} else {
			setIsloading(false);
		}
	}, [isAdding, isUpdating, setIsloading]);

	const formik = useFormik({
		initialValues: reviewFormData,
		enableReinitialize: true,
		onSubmit: async (values) => {
			try {
				if (editReviewId) {
					updateReview(values);
				} else {
					addReview(values);
				}
			} catch (error) {
				console.error("Error submitting review:", error.message);
			}
		},
	});

	const handleRatingChange = (rating) => {
		formik.setFieldValue("rating", rating);
	};

	return (
		<form
			onSubmit={formik.handleSubmit}
			className={`flex flex-col gap-4 p-7 bg-black/10 shadow-xl rounded-lg ${
				currentLanguage === "ar" && "text-right"
			}`}
			dir={currentLanguage === "ar" ? "rtl" : "ltr"}
		>
			<input
				type="text"
				name="clientName"
				placeholder={t("dashboard.reviewForm.userName")}
				value={formik.values.clientName}
				onChange={formik.handleChange}
				className="p-4 border-2 border-gray-300 rounded-lg w-full bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
			/>

			<textarea
				name="reviewBody"
				placeholder={t("dashboard.reviewForm.reviewText")}
				value={formik.values.reviewBody}
				onChange={formik.handleChange}
				className="p-4 border-2 border-gray-300 rounded-lg w-full bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
			/>

			{/* Pass the rating value from formik to StarRating */}
			<StarRating
				maxRating={5}
				color="#fcc419"
				size={32}
				messages={[1, 2, 3, 4, 5]}
				defaultRating={formik.values.rating} // Pass current rating
				onSetRating={handleRatingChange}
			/>

			<button
				type="submit"
				className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
			>
				{editReviewId
					? t("dashboard.reviewForm.update")
					: t("dashboard.reviewForm.submit")}
			</button>
		</form>
	);
}

export default ReviewForm;
