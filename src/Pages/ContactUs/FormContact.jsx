import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Form from "../../Components/Form";
import { useContext } from "react";
import { MobileHandlerContext } from "../../utils/mobileHandler";
import { useTranslation } from "react-i18next";

function FormContact() {
	const { isMobile } = useContext(MobileHandlerContext);
	const { i18n } = useTranslation();

	return (
		<>
			<Container>
				<Header>Contact Us.</Header>
				<main
					className={`w-full flex flex-col md:flex-row items-start gap-20 md:p-0 p-9 ${i18n.language === "ar" && "md:flex-row-reverse justify-between"}`}
				>
					<Form />
					{!isMobile && (
						<div className="flex items-start w-[40%]">
							<div className="image w-[350px] h-[350px]">
								<img
									className="w-full h-full"
									src="/svg/man_working.svg"
									alt="man_working"
								/>
							</div>
							<div className=""></div>
						</div>
					)}
				</main>
			</Container>
		</>
	);
}

export default FormContact;
