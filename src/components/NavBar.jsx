import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Create a separate CSS file for styling
import { signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseInitialize";

export const NavBar = () => {
    const navigate = useNavigate();
    const handleLeavePage = (e) => {
      navigate(e);
    };
  
    return (
        <div id="navBar">
        <button onClick={() => handleLeavePage("/home")}>Tasks</button>
        <button onClick={() => handleLeavePage("/study")}>Study</button>
        <button onClick={() => {signOut(auth), handleLeavePage("/login")}}>Sign Out</button>
      </div>
    )
}