import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import ProductsWeProvideCards from "../../Components/ProductsWeProvideCards";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import { useTranslation } from "react-i18next";

function DashboardHome() {
	const { auth } = useAuth();
	const { t } = useTranslation();
	const services = [
		{
			name: t("dashboard.services.products"),
			path: "products",
		},
		{
			name: t("dashboard.services.category"),
			path: "category",
		},
		{
			name: t("dashboard.services.user"),
			path: "user",
		},
	];
	return (
		<>
			<Helmet>
				<title>Home.</title>
				<meta name="description" content="home" />
			</Helmet>
			<main
				id="home"
				className="w-full h-[85vh] flex justify-center items-center "
			>
				<Container>
					<Header>This is Dashboard.</Header>
					<div className="flex md:flex-row flex-col w-full justify-evenly md:h-2/4 h-4/5 items-center">
						{services
							.filter((el) => {
								// Show the 'user' card only if the user role is 'owner'
								if (el.path === "user" && auth?.user?.role !== "owner") {
									return false;
								}
								return true;
							})
							.map((el) => (
								<ProductsWeProvideCards service={el} key={el.name} />
							))}
					</div>
				</Container>
			</main>
		</>
	);
}

export default DashboardHome;
