// import { useContext } from "react";
// import { MobileHandlerContext } from "../utils/mobileHandler";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";

function CallUs() {
	// const { isMobile } = useContext(MobileHandlerContext);

	return (
		<Link
			to={"tel:+201508096373"}
			className={`text-[18px] bottom-[24px] right-[24px] fixed  rounded-[50px] text-white bg-primary-600 flex items-center w-fit px-5 py-3 gap-4 h-[60px] z-50`}
		>
			{/* {!isMobile && <p>Call Us Now</p>} */}
			<FaPhone className="rotate-270" />
		</Link>
	);
}

export default CallUs;
