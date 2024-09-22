import { Outlet } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";

function App() {
	return (
		<div>
			<Outlet />
		</div>
	);
}

export default App;
