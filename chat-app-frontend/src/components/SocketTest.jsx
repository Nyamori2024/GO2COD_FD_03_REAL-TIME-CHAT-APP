// src/components/SocketTest.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const SocketTest = () => {
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        socket.on("receive_message", (message) => {
            setReceivedMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("send_message", { sender: "TestUser", content: message });
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Socket.IO Test</h2>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
            <h3>Received Messages:</h3>
            <ul>
                {receivedMessages.map((msg, index) => (
                    <li key={index}>{msg.sender}: {msg.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default SocketTest;