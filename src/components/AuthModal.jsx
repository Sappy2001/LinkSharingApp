import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthModal = ({ children, active, setActive }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<span onClick={onOpen}>{children}</span>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					setActive("");
					onClose();
				}}
			>
				<ModalOverlay />
				<ModalContent w="auto" p={0}>
					{active === "login" ? <Login /> : <Signup />}
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthModal;
