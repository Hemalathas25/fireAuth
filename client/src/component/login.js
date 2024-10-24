import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom"; // useNavigate for navigation

import SignInWithGoogle from "./signInWithGoogle";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully");
            toast.success("User logged in successfully", {
                position: "top-right",
                autoClose: 3000,
            });
            navigate("/profile"); // Use navigate instead of window.location.href
        } catch (error) {
            console.log(error.message);
            // Display user-friendly error messages
            let errorMsg;
            switch (error.code) {
                case "auth/user-not-found":
                    errorMsg = "No user found with this email.";
                    break;
                case "auth/wrong-password":
                    errorMsg = "Incorrect password. Please try again.";
                    break;
                case "auth/invalid-email":
                    errorMsg = "Invalid email format.";
                    break;
                default:
                    errorMsg = "Login failed. Please try again.";
            }
            toast.error(errorMsg, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>

                <div className="mb-3">
                    <label>Email Address</label>
                    <input 
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required // Basic form validation
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input 
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required // Basic form validation
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>

                <p className="forgot-password text-right">
                    New user? <a href="/register">Register Here</a>
                </p>        
                <SignInWithGoogle />    
            </form>

            <ToastContainer />
        </div>
    );
}

export default Login;
