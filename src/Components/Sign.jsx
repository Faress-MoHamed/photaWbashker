import Container from "./Container";
import SignIn from "./SignIn";
import AddAdmin from "./AddAdmin";
import { useState } from "react";

function Sign() {
	const [IsOpen, SetIsOpen] = useState("signIn");
	// console.log(IsOpen);
	return (
		<Container>
			<main className="w-full flex justify-center">
				{IsOpen === "signIn" ? (
					<SignIn setIsOpen={SetIsOpen} />
				) : IsOpen === "signUp" ? (
					<AddAdmin setIsOpen={SetIsOpen} />
				) : null}
			</main>
		</Container>
	);
}

export default Sign;
