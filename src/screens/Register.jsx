import React, { useState } from "react";
import "../styles/Login.css"; // Create a separate CSS file for styling
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/FirebaseInitialize";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorRegistering, setErrorRegistering] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Successfully registered with: " + user.email);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorRegistering(true);
      });
  };

  return (
    <>
      <h2 style={errorRegistering? {margin:0}:{margin:10}}>Create an Account:</h2>
      {errorRegistering ? <h3 className="registerErrorMsg">Error Registering: Email is either invalid or already in use</h3> : null}
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
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleGoBack}>Back</button>
    </>
  );
};

export default Register;
