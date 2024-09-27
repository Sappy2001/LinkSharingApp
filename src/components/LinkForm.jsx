import {
	AddIcon,
	ChevronDownIcon,
	DeleteIcon,
	PhoneIcon,
} from "@chakra-ui/icons";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
} from "@chakra-ui/react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { createRef, useEffect, useState } from "react";
import "../assets/linkForm.css";
const LinkForm = ({ setUserData }) => {
	const [inputValues, setInputValues] = useState({
		fname: "",
		lname: "",
		pic: "",
		git: "",
		tweet: "",
		ig: "",
	});
	const [cropData, setCropData] = useState("#");
	const [openCropper, setOpenCropper] = useState(false);
	const cropperRef = createRef();
	const fileInputRef = createRef();
	const [linkArray, setLinkArray] = useState([]);
	const linkContentArraY = [
		{
			linkName: "Instagram",
			id: "ig",
			logo: "instagram",
		},
		{
			linkName: "Twitter",
			id: "tweet",
			logo: "x-twitter",
		},
		{
			linkName: "Github",
			id: "git",
			logo: "github",
		},
		{
			linkName: "Facebook",
			id: "fb",
			logo: "facebook",
		},
		{
			linkName: "Reddit",
			id: "red",
			logo: "reddit",
		},
		{
			linkName: "Email",
			id: "em",
			logo: "envelope",
		},
		{
			linkName: "Pinterest",
			id: "pin",
			logo: "pinterest",
		},
		{
			linkName: "Snapchat",
			id: "sc",
			logo: "snapchat",
		},
	];
	useEffect(() => {
		console.log("link");
	}, [linkArray]);
	const handleChange = (e) => {
		//stopping page from reload
		e.preventDefault();
		// destructuring e.target
		const { name, value, files } = e.target;
		if (files) {
			const file = files[0];
			//inBuilt js api reads file async
			const reader = new FileReader();
			//onloadend:async func excutes when filereader completes reading file(reader.readAsDataURL)
			reader.onloadend = () => {
				setInputValues({
					...inputValues,
					//key "name"and value both set dynamically so [] is used
					[name]: reader.result,
				});
				// as reader.onloadend is async func so
				//functional update-- prevState is used to get current value
				setUserData((prevState) => ({
					...prevState,
					[name]: reader.result,
				}));
			};
			//readAs converts file in to data Url,
			//once done then onloadend is ran
			reader.readAsDataURL(file);
			setOpenCropper(true);
		} else {
			//spreading the current input value and updating the field thats changed
			setInputValues({
				...inputValues,
				[name]: value,
			});
			//as it is regular input and its synchronous so we spread inputValues
			//to get immediate value thats updated
			setUserData({
				...inputValues,
				[name]: value,
			});
		}
	};
	const getCropData = () => {
		if (typeof cropperRef.current?.cropper !== "undefined") {
			const croppedImage = cropperRef.current?.cropper
				.getCroppedCanvas()
				.toDataURL();
			setCropData(croppedImage);
			//using croppedImage instead cropData as its async state and immidate changes might not come after setCropData
			setInputValues({
				...inputValues,
				pic: croppedImage,
			});
			console.log(inputValues);
			setUserData({
				...inputValues,
				pic: croppedImage,
			});
		}

		setOpenCropper(false);
	};

	const handleLinkButton = (newLink) => {
		if (!linkArray?.includes(newLink)) {
			setLinkArray((prevState) => [...prevState, newLink]);
		}
	};

	const removeLink = (remLink) => {
		if (linkArray?.includes(remLink)) {
			const updatedLinkArray = linkArray.filter((link) => link !== remLink);
			setLinkArray(updatedLinkArray);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("submit");
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<FormControl m={4}>
					{openCropper ? (
						<>
							<Cropper
								ref={cropperRef}
								style={{ height: 300, width: "80%" }}
								zoomTo={0.5}
								initialAspectRatio={1}
								preview=".img-preview"
								src={inputValues.pic}
								viewMode={1}
								minCropBoxHeight={10}
								minCropBoxWidth={10}
								background={false}
								responsive={true}
								autoCropArea={1}
								checkOrientation={false}
								guides={true}
							/>
							<button className="cropButton" onClick={getCropData}>
								Crop Image
							</button>
						</>
					) : (
						<>
							<FormLabel htmlFor="image">Provide your profile image</FormLabel>
							<Input
								className="inputFile"
								type="file"
								name="pic"
								id="image"
								border="2px solid teal"
								w="60%"
								ref={fileInputRef}
								p={1}
								mb={2}
								isRequired={!inputValues.pic}
								onChange={handleChange}
							></Input>
							<Button
								onClick={() => fileInputRef.current.click()} // Trigger file input on button click
								colorScheme="teal"
								variant="outline"
							>
								{inputValues.pic
									? ` ${inputValues.pic.slice(5, 30)}`
									: "Choose File"}
							</Button>
							<HStack mb={4} spacing="24px" display="flex">
								<FormLabel> Name:</FormLabel>
								<Input
									variant="flushed"
									placeholder="First name"
									name="fname"
									isRequired
									onChange={handleChange}
								/>

								<Input
									variant="flushed"
									placeholder="Last name"
									name="lname"
									isRequired
									onChange={handleChange}
								/>
							</HStack>
						</>
					)}

					<Stack spacing={7}>
						<FormLabel htmlFor="git">Links</FormLabel>
						<Menu>
							<MenuButton as={Button} rightIcon={<AddIcon />}>
								ADD LINKS
							</MenuButton>
							<MenuList>
								<MenuItem
									onClick={() => {
										handleLinkButton("fb");
									}}
								>
									Facebook
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleLinkButton("sc");
									}}
								>
									Snapchat
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleLinkButton("red");
									}}
								>
									Reddit
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleLinkButton("git");
									}}
								>
									Github
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleLinkButton("ig");
									}}
								>
									Instagram
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleLinkButton("tweet");
									}}
								>
									Twitter
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleLinkButton("em");
									}}
								>
									Email
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleLinkButton("pin");
									}}
								>
									Pintrest
								</MenuItem>
							</MenuList>
						</Menu>
						{linkContentArraY.map((link) => {
							if (linkArray?.includes(link.id))
								return (
									<InputGroup>
										<InputLeftElement pointerEvents="none">
											<i class={`fa-brands fa-${link.logo} fa-lg`}></i>
										</InputLeftElement>
										<Input
											variant="flushed"
											placeholder={`${link.linkName} Link`}
											name={link.id}
											id={link.id}
											onChange={handleChange}
										/>
										<InputRightElement>
											<Button
												colorScheme="red"
												variant="outline"
												onClick={() => removeLink(link.id)}
											>
												<DeleteIcon />
											</Button>
										</InputRightElement>
									</InputGroup>
								);
						})}
					</Stack>
					<Button
						mt={4}
						colorScheme="teal"
						// isLoading={isSubmitting}
						type="submit"
					>
						Submit
					</Button>
				</FormControl>
			</form>
		</>
	);
};

export default LinkForm;
