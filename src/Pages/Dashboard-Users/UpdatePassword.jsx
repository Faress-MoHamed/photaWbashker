import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";
import useOpenModal from "../../hooks/useOpenModal";
import { updatePasswordUser } from "../../API/EndPointsUser";
import InputField from "../../Components/InputField";

function UpdatePassword() {
	const { setAuth } = useAuth();
	const { setOpenModal } = useOpenModal();
	const { mutate: updatePassword, isLoading: IsLoadigUpdate } = useMutation({
		mutationKey: ["profile", "updatePassword"],
		mutationFn: async (values) => {
			try {
				const { data: res } = await updatePasswordUser(values);
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
					toast.success("updated password Successfully ✅");
				} else {
					throw new Error("updated password Failed ❌");
				}
			} catch (error) {
				console.error(error);
				toast.error(
					error.response?.data?.message || "An error occurred during sign up"
				);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Updated profile successfully✅");
			setOpenModal(false);
		},
	});
	const formik = useFormik({
		initialValues: {
			passwordCurrent: "",
			password: "",
			passwordConfirm: "",
		},
		onSubmit: async (values) => {
			const res = await updatePassword(values);
			console.log(res);
		},
	});
	return (
		<form
			className="w-full flex flex-col items-center justify-center "
			onSubmit={formik.handleSubmit}
		>
			<div className="flex justify-center items-center flex-col w-[80%] gap-2">
				<div className="flex flex-col w-full">
					<InputField
						name={"passwordCurrent"}
						pass={true}
						value={formik.values.passwordCurrent}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
				</div>

				<div className="flex flex-col w-full">
					<InputField
						name={"password"}
						pass={true}
						value={formik.values.password}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
				</div>
				<div className="flex flex-col w-full">
					<InputField
						name={"passwordConfirm"}
						pass={true}
						value={formik.values.passwordConfirm}
						handleChange={formik.handleChange}
						handleBlur={formik.handleBlur}
					/>
				</div>
				<div className="flex justify-center gap-4">
					<button
						type="submit"
						disabled={IsLoadigUpdate}
						className={`${
							IsLoadigUpdate
								? "bg-black/25 text-white"
								: "bg-primary-600 text-white hover:bg-primary-800 duration-300"
						} rounded-full  w-[240px] h-[53px] font-semibold`}
					>
						{IsLoadigUpdate ? "Loading..." : "Update password"}
					</button>
				</div>
			</div>
		</form>
	);
}

export default UpdatePassword;
