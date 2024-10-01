import React, { useEffect, useState } from "react";
// import { MobileHandlerContext } from "../../utils/mobileHandler";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../API/api";
import toast from "react-hot-toast";
import ServicesCard from "../../Components/ServicesCard";

function Services() {
	const [categoryList, setCategoriesList] = useState();
	const { t, i18n } = useTranslation();
	const {
		data: Categories,
		isSuccess: categoriesSuccess,
		isError: categoriesError,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			try {
				const { data: res } = await getAllCategories();
				return res?.categories;
			} catch (error) {
				toast.error(error.message);
			}
		},
	});

	useEffect(() => {
		const onSuccess = () => {
			if (categoriesSuccess) {
				setCategoriesList(Categories);
			}
		};
		const onError = () => {
			if (categoriesError) {
				// Handle error
				console.log(categoriesError);
			}
		};
		onSuccess();
		onError();
	}, [Categories, categoriesSuccess, categoriesError]);

	const currentLang = i18n.language;
	return (
		<main
			id="Services"
			className={`${i18n.language === "ar" ? "font-Changa" : "font-new-amsterdam"} pt-6`}
		>
			<Container>
				<Header>{t("headlines.headline1.title")}</Header>
				<p
					className={`${currentLang === "ar" && "text-right"} md:text-lg text-gray-500 md:px-0 px-7`}
				>
					{t("headlines.headline1.subTitle")}
				</p>
				<div
					className={`${currentLang === "ar" && "flex-row-reverse text-right"} flex justify-center md:flex-row flex-wrap md:justify-evenly items-center gap-5 h-[70%] md:mt-0 mt-10  md:px-0 px-5 overflow-hidden py-10`}
				>
					{categoryList?.map((el, index) => {
						return (
							<React.Fragment key={index}>
								<ServicesCard Category={el} index={index + 1} />
							</React.Fragment>
						);
					})}
				</div>
			</Container>
		</main>
	);
}

export default Services;
