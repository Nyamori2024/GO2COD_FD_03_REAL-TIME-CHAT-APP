// Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store"; // Import Zustand store

const Navbar = () => {
  const user = useStore((state) => state.user); // Get user from Zustand store
  const clearUser = useStore((state) => state.clearUser); // Get clearUser from Zustand store
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser(); // Clear user in Zustand store
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Chat App</Link>
        </Typography>
        {user ? (
          <>
            <Typography variant="body1" style={{ marginRight: '16px', color: 'white' }}>
              Welcome, {user.username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', marginRight: '16px' }}>
              <Button 
                variant="outlined" 
                style={{ color: 'white', borderColor: 'white' }} 
              >
                Login
              </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button 
                variant="outlined" 
                style={{ color: 'white', borderColor: 'white' }} 
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;