import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useLoading from "../../hooks/useLoading";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import {
	addAdmin,
	deleteAdmin,
	GetAllAdmins,
	updateAdmin,
} from "../../API/EndPointsUser";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import InputField from "../../Components/InputField";
import { t } from "i18next";

function GetAllUsers() {
	const queryClient = useQueryClient();
	const { setIsloading } = useLoading();
	const { auth } = useAuth(); // Check if the user is owner
	const [isEditing, setIsEditing] = useState(false);
	const [selectedAdmin, setSelectedAdmin] = useState(null);

	// Fetch all admins
	const { data: admins } = useQuery({
		queryKey: ["admins"],
		queryFn: async () => {
			try {
				setIsloading(true);
				const res = await GetAllAdmins();
				setIsloading(false);
				return res;
			} catch (error) {
				console.error(error);
			}
		},
	});

	// Update admin mutation
	const { mutate: updateAdminMutation, isLoading: isUpdating } = useMutation({
		mutationKey: ["admins", "editAdmins"],
		mutationFn: async (values) => {
			try {
				await updateAdmin(values.id, values);
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			toast.success("Admin updated successfully");
			queryClient.invalidateQueries(["admins"]);
			formik.resetForm(); // Reset the form after update
		},
	});

	// Delete admin mutation
	const { mutate: deleteAdminMutation, isLoading: isDeleting } = useMutation({
		mutationKey: ["admins", "deleteAdmins"],
		mutationFn: async (id) => {
			try {
				await deleteAdmin(id);
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			toast.success("Admin deleted successfully");
			queryClient.invalidateQueries(["admins"]);
		},
	});

	// Add admin mutation
	const { mutate: addAdminMutation, isLoading: isAdding } = useMutation({
		mutationKey: ["admins", "AddAdmins"],
		mutationFn: async (values) => {
			try {
				await addAdmin(values);
			} catch (error) {
				console.error(error);
			}
		},
		onSuccess: () => {
			toast.success("Admin added successfully");
			queryClient.invalidateQueries(["admins"]);
			formik.resetForm();
		},
	});

	// Formik for admin form (edit or add)
	const formik = useFormik({
		enableReinitialize: true, // Allows form to reinitialize when selectedAdmin changes
		initialValues: {
			username: selectedAdmin?.username || "",
			password: "",
			passwordConfirm: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().required("Username is required"),
			// Only validate password and confirmation if adding a new admin
			...(selectedAdmin
				? {} // No validation for password fields when editing
				: {
						password: Yup.string()
							.min(6, "Password must be at least 6 characters")
							.required("Password is required"),
						passwordConfirm: Yup.string()
							.oneOf([Yup.ref("password"), null], "Passwords must match")
							.required("Confirm Password is required"),
					}),
		}),
		onSubmit: (values) => {
			if (selectedAdmin) {
				// Update existing admin
				updateAdminMutation({ id: selectedAdmin._id, ...values });
			} else {
				// Add new admin
				addAdminMutation(values);
			}
			setIsEditing(false);
			setSelectedAdmin(null);
		},
	});

	// Set form values when editing an admin
	useEffect(() => {
		if (selectedAdmin) {
			formik.setValues({
				username: selectedAdmin.username,
				password: "",
				passwordConfirm: "",
			});
		} else {
			formik.resetForm();
		}
	}, [selectedAdmin]);

	return (
		<>
			<Helmet>
				<title>Admin Management</title>
				<meta name="description" content="Admin management" />
			</Helmet>
			<Container>
				<main id="admin-management" className="min-h-screen py-8">
					<Header>{t("dashboard.headers.admins")}</Header>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
						{admins?.map((admin) => (
							<div
								key={admin._id}
								className="bg-white shadow-md rounded-lg p-6"
							>
								<p className="text-lg font-semibold mb-2">
									Username: {admin.username}
								</p>
								{auth.user.role === "owner" && (
									<div className="flex space-x-4 mt-4">
										<button
											className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
											onClick={() => {
												setSelectedAdmin(admin);
												setIsEditing(true);
											}}
										>
											Edit
										</button>
										<button
											className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
											onClick={() => deleteAdminMutation(admin._id)}
											disabled={isDeleting}
										>
											{isDeleting ? "Deleting..." : "Delete"}
										</button>
									</div>
								)}
							</div>
						))}
					</div>

					{/* Form for adding/editing admin */}
					{isEditing && (
						<form
							onSubmit={formik.handleSubmit}
							className="bg-white shadow-md rounded-lg p-6 my-8"
						>
							<h2 className="text-xl font-semibold mb-4">
								{selectedAdmin ? "Edit Admin" : "Add Admin"}
							</h2>

							<div className="mb-4">
								<InputField
									name="username"
									value={formik.values.username}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									placeholder="Username"
									className="border border-gray-300 p-2 rounded-lg w-full"
								/>
								{formik.touched.username && formik.errors.username && (
									<p className="text-red-500 text-sm mt-2">
										{formik.errors.username}
									</p>
								)}
							</div>

							<div className="mb-4">
								<InputField
									name="password"
									pass={true}
									value={formik.values.password}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									placeholder="Password"
									className="border border-gray-300 p-2 rounded-lg w-full"
								/>
								{formik.touched.password && formik.errors.password && (
									<p className="text-red-500 text-sm mt-2">
										{formik.errors.password}
									</p>
								)}
							</div>

							{/* Show the password confirm field only when adding a new admin */}
							<div className="mb-4">
								<InputField
									name="passwordConfirm"
									pass={true}
									value={formik.values.passwordConfirm}
									handleChange={formik.handleChange}
									handleBlur={formik.handleBlur}
									placeholder="Confirm Password"
									className="border border-gray-300 p-2 rounded-lg w-full"
								/>
								{formik.touched.passwordConfirm &&
									formik.errors.passwordConfirm && (
										<p className="text-red-500 text-sm mt-2">
											{formik.errors.passwordConfirm}
										</p>
									)}
							</div>

							<button
								type="submit"
								disabled={isAdding || isUpdating}
								className={`bg-green-500 text-white px-4 py-2 rounded-lg w-full transition duration-300 ${
									isAdding || isUpdating
										? "bg-green-300 cursor-not-allowed"
										: "hover:bg-green-600"
								}`}
							>
								{selectedAdmin
									? isUpdating
										? "Updating..."
										: "Edit Admin"
									: isAdding
										? "Adding..."
										: "Add Admin"}
							</button>
						</form>
					)}

					{/* Button to add a new admin */}
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
						onClick={() => {
							setIsEditing(true);
							setSelectedAdmin(null);
						}}
					>
						Add Admin
					</button>
				</main>
			</Container>
		</>
	);
}

export default GetAllUsers;
