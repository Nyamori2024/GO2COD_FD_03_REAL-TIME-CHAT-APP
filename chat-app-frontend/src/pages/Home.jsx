// Home.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bgcolor="grey.100">
      <Typography variant="h4" color="primary">Welcome to the Chat App!</Typography>
    </Box>
  );
};

export default Home;