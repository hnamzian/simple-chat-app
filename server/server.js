const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath));

const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected.');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date(),
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined chat app',
        createdAt: new Date(),
    })

    socket.on('createMessage', (message) => {
        console.log(message);

        io.emit('newMessage', {
            createdAt: new Date(),
            from: message.from,
            text: message.text
        })

        // socket.broadcast.emit('newMessage', {
        //     createdAt: new Date(),
        //     from: message.from,
        //     text: message.text
        // })
    })

    socket.on('disconnect', () => {
        console.log('user disconnected.')
    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})