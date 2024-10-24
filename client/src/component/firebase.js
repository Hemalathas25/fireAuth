// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: add SDKs for firebase products that you want to  use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1K9AEF6aPezmUjzdgvuquidfvksLFeU4",
  authDomain: "authre-edeb9.firebaseapp.com",
  projectId: "authre-edeb9",
  storageBucket: "authre-edeb9.appspot.com",
  messagingSenderId: "954115449015",
  appId: "1:954115449015:web:2aac7f4e875b3f7c3aed32",
  measurementId: "G-L14EVTHSY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=getAuth();
export const db=getFirestore(app);
export default app;