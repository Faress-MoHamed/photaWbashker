import { useContext } from "react";
import LoadingContext from "../Context/LoadingProvider";

const useLoading = () => {
	return useContext(LoadingContext);
};

export default useLoading;
