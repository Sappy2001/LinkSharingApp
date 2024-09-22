import React, { useState } from "react";
import Login from "./Login";
import "../App.css";
import Signup from "./Signup";
import { NavLink, Outlet } from "react-router-dom";
import AuthModal from "./AuthModal";
import { Button, useDisclosure } from "@chakra-ui/react";

const HomePage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [active, setActive] = useState("");

	return (
		<div className="Home">
			<nav>
				<h2>Link Creator</h2>
				<div className="nav-links">
					{/* <NavLink to="/Login">Login</NavLink>
					<NavLink to="/SignUp">SignUp</NavLink> */}
					<AuthModal active={active} setActive={setActive}>
						<Button
							variant={active === "login" ? "solid" : "outline"}
							colorScheme="orange"
							onClick={() => setActive("login")}
							m={2}
						>
							Login
						</Button>
						<Button
							variant={active === "signin" ? "solid" : "outline"}
							colorScheme="orange"
							active={active}
							onClick={() => setActive("signin")}
							m={2}
						>
							SignUp
						</Button>
					</AuthModal>
				</div>
			</nav>
			<body>
				<Outlet />
			</body>
		</div>
	);
};

export default HomePage;
