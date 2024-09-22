import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { Sign_In } from "../End points/User";
import toast from "react-hot-toast";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import setCookie from "../hooks/SetCookie";
import Header from "./Header";
import { signIn } from "../API/EndPointsUser";

function SignIn({ setIsOpen }) {
	const [loading, setLoading] = useState(false);
	// const [UserAuth, setUserAuth] = useLocalStorage("user", "");
	// const [TokenAuth, setTokenAuth] = useLocalStorage("token", "");
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	const validationSchema = Yup.object({
		username: Yup.string()
			.min(2, "username must be at least 2 characters")
			.max(50, "username must be less than 50 characters")
			.required("username is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
	});
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const { data: res } = await signIn(values);
				console.log(res);
				setLoading(false);
				if (res.status === "success") {
					console.log("Sign-In Response:", res);
					localStorage.setItem("user", JSON.stringify(res.data.user));
					localStorage.setItem("token", res.token);
					setAuth(res.data);
					setCookie("jwt", res.token, 1);
					navigate("/dashboard");
					toast.success("Sign In Successfully ");
				}
			} catch (error) {
				setLoading(false);
				toast.error("Invalid Email or Password");
			}
		},
	});

	return (
		<div className="flex flex-col md:w-2/4 w-full">
			<Header> Sign In Now</Header>
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 p-5">
				<div className="flex flex-col w-full">
					<InputField
						name={"username"}
						type={"username"}
						value={formik.values.username}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
					{formik.touched.username && formik.errors.username ? (
						<div className="text-red-600/80 ml-2">{formik.errors.username}</div>
					) : null}
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
				<div className="flex justify-center">
					<button
						type="submit"
						disabled={loading}
						className={`${
							loading ? "bg-black/25 text-white" : "bg-primary-600 text-white"
						} rounded-full  w-[240px] h-[53px] font-semibold`}
					>
						{loading ? "Loading..." : "Sign In"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default SignIn;
