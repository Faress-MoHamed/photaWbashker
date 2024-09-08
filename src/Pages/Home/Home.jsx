import { Helmet } from "react-helmet";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import Reviews from "./Reviews";

function Home() {
	return (
		<>
			<Helmet>
				<title>Phota W pashker.</title>
				<meta name="description" content="Phota & pashker" />
			</Helmet>{" "}
			<Hero />
			<AboutUs />
			<Reviews/>
		</>
	);
}

export default Home;
