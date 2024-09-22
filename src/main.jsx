import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import CreatePage from "./components/CreatePage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <HomePage />,
				children: [
					{
						path: "create",
						element: <CreatePage />,
					},
				],
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	</React.StrictMode>
);
