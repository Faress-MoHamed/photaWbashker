import React, { useState } from "react";
import Header from "./Header";
import InputField from "./InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuth from "../hooks/useAuth";
import { SignUp } from "../API/EndPointsUser";

function AddAdmin() {
	const [loading, setLoading] = useState(false);

	const { setAuth } = useAuth();
	const navigate = useNavigate();

	const validationSchema = Yup.object({
		username: Yup.string()
			.min(2, "username must be at least 2 characters")
			.max(50, "username must be less than 50 characters")
			.required("username is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		passwordConfirm: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Confirm password is required"),
	});
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
			passwordConfirm: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const { data: res } = await SignUp(values);
				console.log(res);
				if (res.status === "success") {
					localStorage.setItem("user", JSON.stringify(res.data.user));
					localStorage.setItem("token", res.token);
					if (typeof Cookies !== "undefined" && res && res.token) {
						Cookies.set("jwt", res.token);
					} else {
						console.error(
							"Cookies library is not loaded or res.token is undefined"
						);
					}
					setAuth(res.data);
					navigate("/");
					toast.success("Sign Up Successfully");
				} else {
					throw new Error("Sign Up Failed");
				}
			} catch (error) {
				setLoading(false);
				console.error(error);
				toast.error(
					error.response?.data?.message || "An error occurred during sign up"
				);

				// Throw the error to prevent it from being treated as a warning
				throw error;
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<div className="flex flex-col md:w-2/4 w-full">
			<Header>Sign Up Now</Header>
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 p-5">
				<div className="flex flex-col w-full">
					<div className="sides w-full md:flex-row flex-col gap-5 flex justify-between items-center">
						<InputField
							name={"username"}
							type={"text"}
							value={formik.values.username}
							handleChange={formik.handleChange}
							handleBlur={formik.handleBlur}
						/>
					</div>
					<div className="ml-2">
						{formik.touched.username && formik.errors.username ? (
							<div className="text-red-600/80">{formik.errors.name}</div>
						) : null}
					</div>
				</div>

				<div className="flex flex-col w-full">
					<InputField
						name={"password"}
						pass={true}
						type={"password"}
						value={formik.values.password}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
					{formik.touched.password && formik.errors.password ? (
						<div className="text-red-600/80 ml-2">{formik.errors.password}</div>
					) : null}
				</div>

				<div className="flex flex-col w-full">
					<InputField
						name={"passwordConfirm"}
						pass={true}
						type={"password"}
						value={formik.values.passwordConfirm}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
					{formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
						<div className="text-red-600/80 ml-2">
							{formik.errors.passwordConfirm}
						</div>
					) : null}
				</div>

				<div className="flex justify-center">
					<button
						type="submit"
						disabled={loading}
						className={`${
							loading ? "bg-black/25 text-white" : "bg-primary-600 text-white"
						} rounded-full  w-[240px] h-[53px] font-semibold`}
					>
						{loading ? "Loading..." : "Complete Register"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddAdmin;
