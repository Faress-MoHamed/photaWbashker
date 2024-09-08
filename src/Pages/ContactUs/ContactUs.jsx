import { Helmet } from "react-helmet";
import FormContact from "./FormContact";

function ContactUs() {
	return (
		<>
			<Helmet>
				<title>Contact Us.</title>
				<meta name="description" content="Contact Us Phota" />
			</Helmet>
			<>
				<FormContact/>
			</>
		</>
	);
}

export default ContactUs;
