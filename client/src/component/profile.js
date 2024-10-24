import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate(); // Use useNavigate for redirection

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } else {
                console.log("User is not logged in");
            }
            setLoading(false); // Set loading to false after user data is fetched
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate("/login"); // Navigate to login page after logout
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Show loading while fetching data
    }

    return (
        <div>
            {userDetails ? (
                <>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img
                            src={userDetails.photo}
                            width={"40%"}
                            style={{ borderRadius: "50%" }}
                            alt="User profile"
                        />
                    </div>
                    <h3>Welcome {userDetails.firstName}</h3>
                    <div>
                        <p>Email: {userDetails.email}</p>
                        <p>First Name: {userDetails.firstName}</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <p>No user details available.</p>
            )}
        </div>
    );
}

export default Profile;
