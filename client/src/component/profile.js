import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 

function Profile() {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                // User is logged in, fetch the user details from Firestore
                console.log(user);
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                    console.log(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } else {
                // No user is logged in
                console.log("User is not logged in");
            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = "./login"; // Redirect to login page after logging out
            console.log("User logged out successfully!");
            toast.success("User logged out Successfully", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error logging out:", error.message);
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }

    return (
      <div>
        {userDetails ? (
            <>
                <h3>Welcome {userDetails.firstName}</h3>
                <div>
                    <p>Email: {userDetails.email}</p>
                    <p>Firstname: {userDetails.firstName}</p>
                </div>
                <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                </button>
            </>
        ) : (
            <p>Loading...</p>
        )}
        <ToastContainer />
      </div>
    );
}

export default Profile;

