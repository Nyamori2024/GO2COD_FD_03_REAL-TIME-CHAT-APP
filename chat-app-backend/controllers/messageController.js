const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
    const { sender, content } = req.body;

    // Validate input
    if (!sender || !content) {
        return res.status(400).json({ message: 'Sender and content are required' });
    }

    try {
        const newMessage = new Message({ sender, content });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', details: error.message });
    }
};

// Get all messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });  // Latest messages first
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', details: error.message });
    }
};
