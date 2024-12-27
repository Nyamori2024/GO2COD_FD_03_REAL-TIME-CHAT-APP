const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import Socket.IO

// Load environment variables from .env file
dotenv.config({ path: '/workspaces/GO2COD_FD_03_REAL-TIME-CHAT-APP/chat-app-backend/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle send_message event
    socket.on('send_message', (message) => {
        console.log('Message received from client:', message); // Log the received message
        io.emit('receive_message', message); // Broadcast to all connected clients
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});