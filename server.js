let express = require('express')
let http = require('http')
let app = express()
let server = http.createServer(app)
let io = require('socket.io').listen(server);

app.use(express.static(__dirname))

server.listen(process.env.PORT);

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/views/index.html');
});

io.sockets.on('connection', (socket)=>{
    socket.on('eventA', (eventData)=>{
        io.sockets.emit('eventB', {msg: eventData.message})
    })
})