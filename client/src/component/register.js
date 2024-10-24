import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import {setDoc, doc} from "firebase/firestore";
import React,{ useState } from "react";

import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

const handleRegister = async (e) => {
    e.preventDefault();

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user);
        if (user) {
            await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                firstName: fname,
                lastName: lname,
            });
        }

        console.log ("User Registered successfully!!" );
        toast.success("User Registered successfully!!", {
            position: "top-right",
            autoClose: 3000,
        }); 

    } catch (error) {

       if (error.code === 'auth/email-already-in-use'){
       } else {
        console.log(error.message);
        toast.success(error.message, {
            position: "top-right",
            autoClose: 3000,
        });
       }
    }
}

return (
    <div>
    <form onSubmit={handleRegister}>
    <h3>Sign Up</h3>

    <div className="mb-3">
        <label>First name</label>
        <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            required
         />
    </div>

    <div className="mb-3">
        <label>Last name</label>
        <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
         />
    </div>

    <div className="mb-3">
        <label>Email Address</label>
        <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
         />
    </div>

    <div className="mb-3">
        <label>Password</label>
        <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
         />
    </div>

    <div className="d-grid">
        <button type="submit" className="btn btn-primary">
            Sign Up
        </button>
    </div>

    <p className="forgot-password text-right">
        Already registered <a href="/login">Login</a>
    </p>
    </form>
    <ToastContainer />
    </div>
  );
}

export default Register;