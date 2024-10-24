import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignInWithGoogle() {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "", // Add lastName if available or adjust accordingly
        });

        toast.success("User logged in successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        navigate("/profile"); // Use navigate for redirection
      }
    } catch (error) {
      console.error("Google sign-in failed: ", error);
      toast.error("Google sign-in failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img
          src={require("../google.png")}
          width={"60%"}
          alt="Sign in with Google"
        />
      </div>
    </div>
  );
}

export default SignInWithGoogle;
