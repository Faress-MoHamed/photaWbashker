import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

function Form() {
	const [showMessage, setShowMessage] = useState(false);
	const form = useRef();
	const { t, i18n } = useTranslation();
	const currentLang = i18n.language;
	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm("service_x25c0a6", "template_9v25zb1", form.current, {
				publicKey: "uucHziwD-8zdiQZkJ",
			})
			.then(
				() => {
					setShowMessage(true);
					setTimeout(() => {
						setShowMessage(false);
					}, 3000);
					Array.from(form.current.getElementsByTagName("input")).map(
						(el) => (el.value = "")
					);
					const textareas = form.current.getElementsByTagName("textarea");
					for (let i = 0; i < textareas.length; i++) {
						textareas[i].value = "";
					}
				},
				(error) => {
					console.log("FAILED...", error.text);
				}
			);
	};

	return (
		<div className=" md:w-[60%] w-full">
			<form className="flex flex-col" ref={form} onSubmit={sendEmail}>
				<>
					<label
						htmlFor={"name"}
						className={`inline-block after:content-['*'] after:text-red-700 capitalize ${currentLang === "ar" ? "text-right" : ""}`}
					>
						{t("form.name")}
					</label>
					<input
						id={"name"}
						dir={currentLang === "ar" ? "rtl" : "ltr"}
						aria-label={`${"name"}`}
						required
						className="outline-none p-2 border-primary-500 border-[2px] rounded-md bg-primary-50 h-11 placeholder:text-xl "
						type={`${"text"}`}
						name={`user_${"name"}`}
					/>
				</>
				<>
					<label
						htmlFor={"email"}
						className={`inline-block after:content-['*'] after:text-red-700 capitalize ${currentLang === "ar" && "text-right"}`}
					>
						{t("form.email")}
					</label>
					<input
						id={"email"}
						dir={currentLang === "ar" ? "rtl" : "ltr"}
						aria-label={`${"email"}`}
						required
						className="outline-none p-2 border-primary-500 border-[2px] rounded-md bg-primary-50 h-11 placeholder:text-xl "
						type={`${"text"}`}
						name={`user_${"email"}`}
					/>
				</>
				<label
					className={`inline-block after:content-['*'] after:text-red-700 capitalize ${currentLang === "ar" && "text-right"}`}
				>
					{t("form.message")}
				</label>
				<textarea
					dir={currentLang === "ar" && "rtl"}
					aria-label="text area"
					className="outline-none p-2 border-primary-500 border-[2px] rounded-md bg-primary-50 placeholder:text-xl"
					name="message"
					cols={50}
					rows={10}
				/>
				<div className="flex justify-center space-y-14 my-5">
					<button
						disabled={showMessage}
						aria-label="submit"
						type="submit"
						className={`bg-primary-500 w-36 h-12 rounded-full text-lg hover:text-white/90 font-bold hover:scale-110 text-white transition-all duration-300`}
					>
						{showMessage ? t("form.successSend") : t("form.submit")}
					</button>
				</div>
			</form>
		</div>
	);
}

export default Form;
