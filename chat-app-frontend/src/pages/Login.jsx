import React from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import useStore from "../store"; // Import Zustand store

const Login = () => {
  const setUser = useStore((state) => state.setUser); // Get setUser from Zustand store
  const navigate = useNavigate();

  const handleAuthSuccess = (data) => {
    setUser({ username: data.username, token: data.token }); // Set user in Zustand store
    navigate("/chat"); // Redirect to chat page after login
  };

  return <AuthForm isLogin={true} onAuthSuccess={handleAuthSuccess} />;
};

export default Login;