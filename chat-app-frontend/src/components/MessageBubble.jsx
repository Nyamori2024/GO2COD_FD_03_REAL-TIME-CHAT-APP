// MessageBubble.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const MessageBubble = ({ message }) => {
  const isSender = message.sender === "You";

  return (
    <Box display="flex" justifyContent={isSender ? "flex-end" : "flex-start"} mb={2}>
      {!isSender && (
        <Box mr={1}>
          <img
            src={`https://ui-avatars.com/api/?name=${message.sender}`}
            alt={message.sender}
            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
          />
        </Box>
      )}
      <Box
        p={2}
        borderRadius="8px"
        bgcolor={isSender ? "primary.main" : "grey.300"}
        color={isSender ? "white" : "black"}
      >
        <Typography variant="body2" fontWeight="bold">{message.sender}</Typography>
        <Typography variant="body1">{message.content}</Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(message.timestamp).toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBubble;