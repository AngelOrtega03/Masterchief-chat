var express = require('express');
var socket = require('socket.io');
const PORTNUM = process.env.PORT || 4000;

// App setup
var app = express();
var server = app.listen(PORTNUM, function(){
    console.log("listening to requests on port "+PORTNUM);
});

// Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket)  {
    console.log("made socket connection", socket.id);
    
    //Handle chat event
    socket.on('chat',function(data) {
        io.sockets.emit('chat', data);
        socket.broadcast.emit('play');
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    })
});