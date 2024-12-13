const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import Socket.IO

dotenv.config({ path: '/workspaces/GO2COD_FD_03_REAL-TIME-CHAT-APP/chat-app-backend/.env' });


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// console.log(process.env.MONGODB_URI); // Log the MongoDB URI to ensure it's being loaded correctly
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI )
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
        origin: '*', // Adjust this to your frontend URL in production
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
