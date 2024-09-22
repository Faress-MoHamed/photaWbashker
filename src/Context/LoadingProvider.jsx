import { createContext, useState } from "react";

const LoadingContext = createContext({});

export function LoadingProvider({ children }) {
	const [isLoading, setIsloading] = useState(false);
	return (
		<LoadingContext.Provider value={{ isLoading, setIsloading }}>
			{children}
		</LoadingContext.Provider>
	);
}

export default LoadingContext;
