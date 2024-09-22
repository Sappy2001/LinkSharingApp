import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Text,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

//object created for validation and value parsing
//shape() used to handle nested obj & complex validation
const validationSchema = Yup.object().shape({
	//.email checks for @,.com and valid domain name
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	//num length 10,and consist of only 0-9
	phone: Yup.string()
		.matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
		.required("Phone is required"),
	name: Yup.string().required("Required"),
	password: Yup.string()
		.matches(
			//password special chars: (!@#$%^&*)
			/^(?=.*[!@#$%^&*])/,
			"Password must contain at least one special character"
		)
		.required("Password is required"),
});

const Signup = () => {
	//redirect to google page
	const handlePopup = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
				console.log(user);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleSubmit = (values, actions) => {
		console.log(values.email, values.password);
		console.log(actions);
		actions.setSubmitting(false);
	};
	return (
		<Box
			display="flex"
			width="350px"
			border="2px solid black"
			borderRadius="5px"
			flexDir="column"
			m={2}
			p={2}
			justifyContent="space-between"
			alignItems="center"
		>
			<div className="auth-header">
				<h2>Join to create your personalized links!</h2>
			</div>
			<Button
				leftIcon={<i class="fa-brands fa-google"></i>}
				p={0}
				w="70%"
				mb={3}
				variant="outline"
				colorScheme="cyan"
				onClick={handlePopup}
			>
				Continue with Google
			</Button>
			or
			<Formik
				initialValues={{ email: "", phone: "", name: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{/* boolean formik prop-turns true when submitting in process */}
				{({ isSubmitting, isValid, dirty, errors, touched }) => (
					<Form>
						<FormControl
							display="flex"
							flexDir="column"
							m={1}
							mb={5}
							alignItems="center"
						>
							<Stack spacing={4}>
								<InputGroup size="md">
									<InputLeftElement pointerEvents="none">
										<EmailIcon color="gray.500" />
									</InputLeftElement>
									{/* Field connect input to formik,name is the key for initalState and changes in the input */}

									<Field
										name="email"
										//here using Input comp for field
										as={Input}
										pl="2.5rem"
										type="email"
										placeholder=" Email"
										variant="filled"
										//err & touched taken from formik
										isInvalid={errors.email && touched.email}
									/>
								</InputGroup>
								<ErrorMessage
									name="email"
									component={Text}
									fontSize="15px"
									fontWeight="600"
									color="red.500"
								/>

								<InputGroup size="md" display="flex">
									<InputLeftElement pointerEvents="none">
										<PhoneIcon color="gray.500" />
									</InputLeftElement>
									<Field
										name="phone"
										as={Input}
										pl="2.5rem"
										type="tel"
										placeholder=" Phone Number"
										variant="filled"
										isInvalid={errors.phone && touched.phone}
									/>
								</InputGroup>
								<ErrorMessage
									name="phone"
									component={Text}
									fontSize="15px"
									fontWeight="600"
									color="red.500"
								/>
								<FormHelperText>
									We'll never share your email/phone number
								</FormHelperText>
								<Field
									name="name"
									as={Input}
									type="text"
									placeholder="name"
									variant="filled"
									isInvalid={errors.name && touched.name}
								/>
								<ErrorMessage
									name="name"
									component={Text}
									fontSize="15px"
									fontWeight="600"
									color="red.500"
								/>
								<Field
									name="password"
									as={Input}
									type="password"
									placeholder="Password"
									variant="filled"
									isInvalid={errors.password && touched.password}
								/>
								<ErrorMessage
									name="password"
									component={Text}
									fontSize="15px"
									fontWeight="600"
									color="red.500"
								/>
								<Button
									type="submit"
									colorScheme="blue"
									isLoading={isSubmitting}
									isDisabled={!isValid && dirty}
								>
									Sign Up
								</Button>
							</Stack>
						</FormControl>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default Signup;
