import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import OneProduct from "./Pages/Products/OneProduct";
import ContactUs from "./Pages/ContactUs/ContactUs";
import DashboardApp from "./DashboardApp";
import "./i18n"; 

function App() {
	const router = (
		<Routes>
			<Route element={<Layout />} path="/">
				<Route index={true} element={<Home />} />
				<Route path="Products" element={<Products />} />
				<Route path="Products/:id" element={<OneProduct />} />
				<Route path="ContactUs" element={<ContactUs />} />
			</Route>
			<Route>
				<Route path="dashboard/*" element={<DashboardApp />} />
			</Route>
		</Routes>
	);
	// 	{
	// 		path: "/",
	// 		element: <Layout />,
	// 		children: [
	// 			{
	// 				index: true,
	// 				element: <Home />,
	// 			},
	// 			{
	// 				path: "Products",
	// 				element: <Products />,
	// 			},
	// 			{
	// 				path: "Products/:id",
	// 				element: <OneProduct />,
	// 			},
	// 			{
	// 				path: "/ContactUs",
	// 				element: <ContactUs />,
	// 			},
	// 		],
	// 	},
	// 	{
	// 		path: "/dashboard",
	// 		element: <DashboardApp />,
	// 	},
	// ]);

	return <BrowserRouter>{router}</BrowserRouter>;
}

export default App;
