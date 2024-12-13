import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";

const Sidebar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleActiveUsers = (activeUsers) => {
      if (Array.isArray(activeUsers)) {
        setUsers(activeUsers);
      } else {
        console.error("Received invalid user data:", activeUsers);
      }
    };

    socket.on("active_users", handleActiveUsers);

    return () => {
      socket.off("active_users", handleActiveUsers);
    };
  }, [socket]);

  return (
    <Box
      sx={{
        width: "250px",
        bgcolor: "grey.100",
        p: 2,
        borderRight: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Active Users
      </Typography>
      <List>
        {users.length > 0 ? (
          users.map((user, index) => <ListItem key={index}>{user}</ListItem>)
        ) : (
          <Typography variant="body2" color="textSecondary">
            No active users
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
