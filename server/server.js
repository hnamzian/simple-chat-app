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
        createdAt: new Date(),
        from: 'juli@ex.com',
        text: 'heu babi'
    })

    socket.on('createMessage', (message) => {
        console.log(message);

        io.emit('newMessage', {
            createdAt: new Date(),
            from: message.from,
            text: message.text
        })
    })

    socket.on('disconnect', () => {
        console.log('user disconnected.')
    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})