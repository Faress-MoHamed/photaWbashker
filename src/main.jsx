import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MobileHandlerProvider } from "./utils/mobileHandler.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<MobileHandlerProvider>
			<Toaster position="top-right" />

			<App />
			<ReactQueryDevtools client={queryClient} />
		</MobileHandlerProvider>
	</QueryClientProvider>
);
