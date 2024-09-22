import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Text,
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React from "react";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase";
//object created for validation and value parsing
//shape() used to handle nested obj & complex validation
const validationSchema = Yup.object().shape({
	//.email checks for @,.com and valid domain name

	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	//email validation checked when phone field is empty
	// .when("phone", {
	// 	is: (phone) => !phone || phone.length === 0,
	// 	//if both empty then
	// 	then: Yup.string().required("Either email or phone is required"),
	// 	//otherwise phone is not empty
	// 	otherwise: Yup.string(),
	// }),
	//num length 10,and consist of only 0-9
	phone: Yup.string()
		.matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
		.required("Phone is required"),
	// .when(["email"], {
	// 	is: (email) => !email || email.length === 0,
	// 	then: Yup.string().required("Either email or phone is required"),
	// 	otherwise: Yup.string(),
	// }),

	name: Yup.string().required("Required"),
	password: Yup.string()
		.matches(
			//password special chars: (!@#$%^&*)
			/^(?=.*[!@#$%^&*])/,
			"Password must contain at least one special character"
		)
		.required("Password is required"),
});

const Login = () => {
	//redirect to google page
	const handlePopup = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				// const cred = GoogleAuthProvider.credentialFromResult(result);
				// //gives access token to use later
				// const token = cred.accessToken;
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

		createUserWithEmailAndPassword(auth, values.email, values.phone)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				console.log(user, "logged in");
			})
			.catch((error) => {
				console.log(error, "error occured");
			});
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
				colorScheme="purple"
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
				{({ isSubmitting, isValid, dirty }) => (
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
									<Field name="email">
										{({ field, form }) => (
											//field prop gives its by spreading inside input{name,value,onChange} and connects with formik state
											//form gives helper func errors & touched
											<Input
												{...field}
												pl="2.5rem"
												type="email"
												placeholder=" Email"
												variant="filled"
												isInvalid={form.errors.email && form.touched.email}
											/>
										)}
									</Field>
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
									<Field name="phone">
										{({ field, form }) => (
											//form gives helper func errors & touched

											<Input
												{...field}
												pl="2.5rem"
												type="tel"
												placeholder=" Phone Number"
												variant="filled"
												isInvalid={form.errors.phone && form.touched.phone}
											/>
										)}
									</Field>
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
								<Field name="name">
									{({ field, form }) => (
										//form gives helper func errors & touched
										//

										<Input
											{...field}
											type="text"
											placeholder="name"
											variant="filled"
											isInvalid={form.errors.name && form.touched.name}
										/>
									)}
								</Field>
								<ErrorMessage
									name="name"
									component={Text}
									fontSize="15px"
									fontWeight="600"
									color="red.500"
								/>
								<Field name="password">
									{({ field, form }) => (
										<Input
											{...field}
											type="password"
											placeholder="Password"
											variant="filled"
											isInvalid={form.errors.password && form.touched.password}
										/>
									)}
								</Field>
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
									Login
								</Button>
							</Stack>
						</FormControl>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default Login;
