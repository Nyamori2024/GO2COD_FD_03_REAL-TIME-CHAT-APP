import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Alert, Box } from "@mui/material";
import useStore from "../store"; // Import Zustand store

const AuthForm = ({ isLogin, onAuthSuccess }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const setUser = useStore((state) => state.setUser); // Get setUser from Zustand store

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? `/api/auth/login` : `/api/auth/register`;
      
      // Fetch request
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        throw new Error("An error occurred while processing your request.");
      }

      const data = await res.json();
      setUser({ username: data.username, token: data.token }); // Set user in Zustand store
      onAuthSuccess(data);
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
  };

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ padding: 2, maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          {isLogin ? "Login" : "Register"}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="username"
            value={formData.username}
            onChange={handleChange}
            label="Username"
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            type="password"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AuthForm;