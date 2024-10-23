import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1K9AEF6aPezmUjzdgvuquidfvksLFeU4",
  authDomain: "authre-edeb9.firebaseapp.com",
  projectId: "authre-edeb9",
  storageBucket: "authre-edeb9.appspot.com",
  messagingSenderId: "954115449015",
  appId: "1:954115449015:web:2aac7f4e875b3f7c3aed32",
  measurementId: "G-L14EVTHSY5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }