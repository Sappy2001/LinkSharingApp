import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyCOI-5XJMdzwS3c3kj07fhHqH8MNcwve1A",
	authDomain: "link-sharing-app-648a2.firebaseapp.com",
	projectId: "link-sharing-app-648a2",
	storageBucket: "link-sharing-app-648a2.appspot.com",
	messagingSenderId: "366262686032",
	appId: "1:366262686032:web:5c94d7dc5d5f7e15075c55",
	measurementId: "G-NK42YED8RC",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
