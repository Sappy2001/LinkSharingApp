import { PhoneIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const LinkForm = ({ setUserData }) => {
	const [inputValues, setInputValues] = useState({
		fname: "",
		lname: "",
		pic: "",
		git: "",
		tweet: "",
		ig: "",
	});
	const handleChange = (e) => {
		// destructuring e.target
		const { name, value, files } = e.target;

		if (files) {
			const file = files[0];
			//inBuilt js api reads file async
			const reader = new FileReader();
			//onloadend:async func excutes when filereader completes reading file
			reader.onloadend = () => {
				setInputValues({
					...inputValues,
					//key value name is set dynamically so [] is used
					[name]: reader.result,
				});
				// as reader.onloadend is async func so
				//functional update-- prevState is used to get current value
				setUserData((prevState) => ({
					...prevState,
					[name]: reader.result,
				}));
			};
			//readAs converts file inot data Url,
			//once done then onloadend is ran
			reader.readAsDataURL(file);
		} else {
			//spreading the the current input value and updating the field thats changed
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

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<FormControl m={4}>
					<FormLabel htmlFor="image">Provide your profile image</FormLabel>
					<Input
						type="file"
						name="pic"
						id="image"
						border="2px solid teal"
						w="60%"
						p={1}
						mb={2}
						isRequired
						onChange={handleChange}
					></Input>

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
					<Stack spacing={10}>
						<FormLabel htmlFor="git">Links</FormLabel>
						<InputGroup>
							<InputLeftElement pointerEvents="none">
								<i class="fa-brands fa-github fa-lg"></i>
							</InputLeftElement>
							<Input
								variant="flushed"
								placeholder="Github Link"
								name="git"
								id="git"
								onChange={handleChange}
							/>
						</InputGroup>
						<InputGroup>
							<InputLeftElement pointerEvents="none">
								<i class="fa-brands fa-x-twitter fa-lg"></i>
							</InputLeftElement>
							<Input
								variant="flushed"
								placeholder="Twitter Link"
								name="tweet"
								onChange={handleChange}
							/>
						</InputGroup>
						<InputGroup>
							<InputLeftElement pointerEvents="none">
								<i class="fa-brands fa-instagram fa-lg"></i>
							</InputLeftElement>
							<Input
								variant="flushed"
								name="ig"
								placeholder="Instagram Link"
								onChange={handleChange}
							/>
						</InputGroup>
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
