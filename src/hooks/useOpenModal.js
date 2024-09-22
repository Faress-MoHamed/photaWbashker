import { useContext } from "react";
import ModalContext from "../Context/ModalProvider";

const useOpenModal = () => {
	return useContext(ModalContext);
};

export default useOpenModal;
