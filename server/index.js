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
    const id = socket.id
    console.log('IO connection')

    socket.join('testRoom')
    socket.on('snake', (data) => {
        snakes[id] = data
        const sendingData = {}
        for (const [key, value] of Object.entries(snakes)) {
            if (key !== id) {
                sendingData[key] = value
            }
        }
        socket.emit('otherSnakes', sendingData)
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
        delete snakes[id]
    })
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
