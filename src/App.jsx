import { useState, useEffect } from "react";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Study from "./screens/Study";
import { createBrowserRouter, Route, RouterProvider, useNavigate } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/", // Entrypoint
    element: <Login />,
  },
  {
    path: "/login", // Return to login from somewhere else
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/study",
    element: <Study />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
