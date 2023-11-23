import React, { useState } from "react";
import "../styles/Login.css"; // Create a separate CSS file for styling
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase/FirebaseInitialize";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();
  const navigateRef = React.useRef(navigate);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(auth.currentUser.email)
        navigateRef.current("/home");
      }
    });

    return unsubscribe; //Stop listening for authentication change
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Login Successful","Logged in with: " + user.email);
      })
      .catch((error) => console.log("Error Logging In", error.message));
  };

  const handleRegister = () => {
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredentials) => {
    //     const user = userCredentials.user;
    //     console.log("Successfully registered with: " + user.email);
    //   })
    //   .catch((error) => console.log(error.message));
    navigate("/register")
  };

  return (
    <>
      <h1>ProcrastiMate</h1>
      <h2>Log In:</h2>
      <div>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <div className="inputUnderline" />
        <input
          type="password" // Use type="password" for password input
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
      </div>
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleRegister}>Create an Account</button>
    </>
  );
};

export default Login;
