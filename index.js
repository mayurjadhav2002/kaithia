const express = require('express');
const cors = require('cors');
const { Connect } = require('./db/connect');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT;
const Routes = require('./routes');
const Messages = require('./models/Messages');
const app = express();
app.use(cors());
app.use('/static', express.static(__dirname + '/public'));

Connect();

app.use('/api', Routes);

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'], 
        credentials: true
    }
});
const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('authenticate', (userId) => {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} authenticated with socket ID ${socket.id}`);
    });

    socket.on('sendMessage', async (data) => {
        const { message, senderId, groupId } = data;

        console.log('Received message:', data);

        try {
            const newMessage = new Messages({
                message: message, 
                sender: senderId,  
                groupId: groupId || null,
                isRead: false,
                created_on: new Date(),
            });
            await newMessage.save();
            console.log('Message saved:', newMessage);
            if (groupId) {
                io.to(groupId).emit('receiveMessage', newMessage);
                console.log(`Message sent to group ${groupId}`);
            } else {
                io.emit('receiveMessage', newMessage);
                console.log(`Message sent to all users`);
            }
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });
    socket.on('joinGroup', (groupId) => {
        socket.join(groupId);
        console.log(`User ${socket.id} joined group ${groupId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        for (const [userId, socketId] of Object.entries(userSocketMap)) {
            if (socketId === socket.id) {
                delete userSocketMap[userId];
                console.log(`User ${userId} disconnected`);
                break;
            }
        }
    });
});

server.listen(port, () => console.log(`Server is running on port: ${port}`));
