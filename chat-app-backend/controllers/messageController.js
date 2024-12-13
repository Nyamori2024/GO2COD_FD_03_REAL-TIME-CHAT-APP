// controllers/messageController.js
const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
    const { sender, content } = req.body;

    try {
        const newMessage = new Message({ sender, content });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully', message: newMessage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};