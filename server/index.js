const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const port = 3000



const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
})

const snakes = {}

io.on('connection', (socket) => {
    const currSocket = socket
    console.log('IO connection')

    socket.join('testRoom')
    socket.on('snake', (data) => {
        snakes[currSocket] = data
        let sendingData = Object.assign({}, snakes);


        delete sendingData[currSocket]
        socket.broadcast.emit('otherSnakes', snakes)
    })

    socket.on('disconnect', () => {
        delete snakes[currSocket]
    })
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
