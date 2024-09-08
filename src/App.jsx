// import { useContext } from "react";
// import { MobileHandlerContext } from "./utils/mobileHandler";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home/Home";
import "./i18n";
// import AnimatedCursor from "react-animated-cursor";
import Products from "./Pages/Products/Products";
import OneProduct from "./Pages/Products/OneProduct";
import ContactUs from "./Pages/ContactUs/ContactUs";

function App() {
	// const { isMobile } = useContext(MobileHandlerContext);
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: "Products",
					element: <Products />,
				},
				{
					path: "Products/:id",
					element: <OneProduct />,
				},
				{
					path: "/ContactUs",
					element: <ContactUs />,
				},
			],
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
			{/* {!isMobile && (
				<AnimatedCursor
					innerSize={8}
					outerSize={20}
					color="0,0,0"
					outerAlpha={0.2}
					innerScale={0.7}
					outerScale={5}
					clickables={[
						"button",
						"a",
						'input[type="text"]',
						'input[type="email"]',
						'input[type="number"]',
						'input[type="submit"]',
						'input[type="image"]',
						"label[for]",
						"select",
						"textarea",
					]}
				/>
			)} */}
		</>
	);
}
export default App;
