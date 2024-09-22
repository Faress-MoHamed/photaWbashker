import { Helmet } from "react-helmet";
import Hero from "./Hero";
import Reviews from "./Reviews";
import Services from "./Services";
import AboutUs from "./AboutUs";
// import OurCustomers from "./OurCustomers";

function Home() {
	return (
		<>
			<Helmet>
				<title>Phota W pashker.</title>
				<meta name="description" content="Phota & pashker" />
			</Helmet>{" "}
			<Hero />
			<AboutUs />
			{/* <OurCustomers /> */}
			<Services />
			<Reviews />
		</>
	);
}

export default Home;
