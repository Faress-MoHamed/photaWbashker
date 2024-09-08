import { createContext, useState } from "react";
import NavBar from "../Components/NavBar";
import TopNavBar from "../Components/TopNavBar";
import CallUs from "./../Components/CallUs";
import { Outlet } from "react-router-dom";

export const ModalContext = createContext();
function Layout() {
	const [open, setOpen] = useState(false);
	const [openModal, setOpenModal] = useState("");

	return (
		<>
			<ModalContext.Provider value={{ setOpenModal, openModal }}>
				<TopNavBar setOpen={setOpen} />
				<NavBar open={open} setOpen={setOpen} />
				<Outlet />
				<CallUs />
			</ModalContext.Provider>
		</>
	);
}

export default Layout;