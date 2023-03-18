// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuzw-jxTspC-AcBOJZDZNPTE2X0l-XD_E",
  authDomain: "react-curso-29930.firebaseapp.com",
  projectId: "react-curso-29930",
  storageBucket: "react-curso-29930.appspot.com",
  messagingSenderId: "340887594122",
  appId: "1:340887594122:web:9cadc1b62547e5e1627973",
  measurementId: "G-6SK4SMWP49",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
