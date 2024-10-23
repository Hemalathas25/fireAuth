import React, { useState } from "react";

function Profile() {
    const [userDetails, setUserDetails] = useState(null);

    return (
        <div>
            {userDetails ? (
                <>
                    <h3>Welcome {userDetails.firstName} </h3>

                    <div>
                        <p>Email: {userDetails.email}</p>
                        <p>First Name: {userDetails.firstName}</p>
                    </div>

                    <button className="btn btn-primary" onClick={() => {
                        
                    }}>
                        Logout
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Profile;
