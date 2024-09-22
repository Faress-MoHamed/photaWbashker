import { createContext, useState } from "react";

const ModalContext = createContext({});

export function ModalProvider({ children }) {
	const [openModal, setOpenModal] = useState("");
	return (
		<ModalContext.Provider value={{ openModal, setOpenModal }}>
			{children}
		</ModalContext.Provider>
	);
}

export default ModalContext;
