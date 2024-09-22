import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import mobileImage from "./Images/mobile_mockup.png";
import "../App.css";
import LinkForm from "./LinkForm";
import "./createPage.css";

const CreatePage = () => {
	const [userData, setUserData] = useState({
		pic: "",
		fname: "",
		lname: "",
		git: "",
		ig: "",
		tweet: "",
	});
	console.log(userData);
	4;

	const handleRedirect = (buttonText) => {
		// without if the link will start with localhost(relative path)
		if (
			!buttonText.startsWith("https://") ||
			!buttonText.startsWith("http://")
		) {
			buttonText = "https://" + buttonText;
			window.open(buttonText, "_blank");
		}
	};
	return (
		<>
			<Box
				backgroundImage={mobileImage}
				h={{ base: "93vh" }}
				m={1}
				mr={0}
				w="50%"
				backgroundSize="contain"
				backgroundRepeat="no-repeat"
			>
				<div className="in-mobile">
					{/* as its an backgroundImg so background-size required */}
					<div
						className="display-pic"
						style={{
							backgroundImage: `url(${userData.pic})`,
						}}
					>
						{!userData.pic ? (
							<span style={{ textAlign: "center" }}> No Image Available</span>
						) : (
							<></>
						)}
					</div>
					<div className="userName">{`${userData.fname} ${userData.lname}`}</div>
					<div className="infoBoxes">
						<Button
							className="git Box"
							leftIcon={<i class="fa-brands fa-github fa-lg"></i>}
							onClick={(e) => {
								handleRedirect(e.target.textContent);
							}}
						>
							{userData.git}
						</Button>
						<Button
							className="tweet Box"
							leftIcon={<i class="fa-brands fa-x-twitter fa-lg"></i>}
							onClick={(e) => {
								handleRedirect(e.target.textContent);
							}}
						>
							{userData.tweet}
						</Button>
						<Button
							className="ig Box"
							leftIcon={<i class="fa-brands fa-instagram fa-lg"></i>}
							onClick={(e) => {
								handleRedirect(e.target.textContent);
							}}
						>
							{userData.ig}
						</Button>
					</div>
				</div>
			</Box>
			<Box
				h="93vh"
				w="50%"
				display="flex"
				flexDir="column"
				alignItems="center"
				justifyContent="center"
			>
				<LinkForm setUserData={setUserData} />
			</Box>
		</>
	);
};

export default CreatePage;
