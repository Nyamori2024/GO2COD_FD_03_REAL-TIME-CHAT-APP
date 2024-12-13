// Chat.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import MessageBubble from "../components/MessageBubble";
import Sidebar from "../components/Sidebar";
import { Box, TextField, Button, Typography } from "@mui/material";
import useStore from "../store"; // Import Zustand store

const socket = io(); 

const Chat = () => {
  const user = useStore((state) => state.user); // Get user from Zustand store
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!user || !user.username) {
      console.error("User is not authenticated or username is not available.");
      return;
    }

    // Load previous messages
    socket.on("load_messages", (previousMessages) => {
      setMessages(previousMessages);
    });

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Log socket connection status
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return () => {
      socket.off("load_messages");
      socket.off("receive_message");
    };
  }, [user]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      if (user && user.username) {
        const messageData = { sender: user.username, content: newMessage };
        socket.emit("send_message", messageData);
        setMessages((prev) => [...prev, messageData]);
        setNewMessage("");
      } else {
        console.error("User is not authenticated or username is not available.");
      }
    }
  };

  return (
    <Box display="flex">
      <Sidebar socket={socket} />
      <Box flex={1} p={2}>
        <Typography variant="h5" gutterBottom>Chat Room</Typography>
        <Box height="400px" overflow="auto" border={1} borderRadius={1} p={2}>
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
        </Box>
        <Box display="flex" mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;