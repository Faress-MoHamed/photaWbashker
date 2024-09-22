import { useState } from "react";
import { Outlet } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import { OrbitProgress } from "react-loading-indicators";
import UpdatePassword from "./Dashboard-Users/UpdatePassword";
import { IoIosCloseCircle } from "react-icons/io";
import useOpenModal from "../hooks/useOpenModal";
import Modal from "../ui/Modal";
import NavBarDashboard from "../Components/NavBarDashboard";
import TopNavBarDashboard from "../Components/TopNavBarDashboard";

function LayoutDashboard() {
	const [open, setOpen] = useState(false);
	const { isLoading } = useLoading();
	const { openModal, setOpenModal } = useOpenModal();
	// console.log(isLoading);
	return (
		<>
			<TopNavBarDashboard setOpen={setOpen} />
			<NavBarDashboard open={open} setOpen={setOpen} />
			{isLoading && (
				<Modal>
					<div className="flex justify-center items-center h-full">
						<OrbitProgress
							variant="track-disc"
							speedPlus="2"
							easing="ease-in-out"
							color={["#7AA486"]}
						/>
					</div>
				</Modal>
			)}
			{openModal === "update Password" && (
				<Modal
					parentClassName={"w-[90%] h-[60%]"}
					className={"p-2 relative"}
					handleClose={() => setOpenModal(false)}
				>
					<button
						onClick={() => setOpenModal(false)}
						className="absolute top-3 right-3"
					>
						<IoIosCloseCircle className="w-7 h-7 text-primary-900 hover:text-primary-700 duration-300 transition-colors" />
					</button>
					<div className="flex justify-center items-center h-full w-full">
						<UpdatePassword />
					</div>
				</Modal>
			)}
			<Outlet />
		</>
	);
}

export default LayoutDashboard;
