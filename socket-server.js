var fs = require('fs'),
    socket = require('socket.io'),
    http = require('http');
    
function handler(req, res) {
    
    fs.readFile(__dirname + '/index.html', function (error, data) {
        if (error) {
            res.status(500);
            res.end('Server Error!');
        } else {
            res.end(data);
        }
    });
    
    return;
}

var server = http.createServer(handler);
server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');

var io = socket.listen(server);

io.sockets.on('connection', function (socket) {
    
    socket.emit('data', 'Hello!');
    
    socket.on('addme', function (username) {
        socket.username = username;
        socket.emit('chat', 'SERVER', 'You are connected!');
        socket.broadcast.emit('chat', 'SERVER', username + ', is connected, now.');
    });
    
    socket.on('sendchat', function (data) {
        io.sockets.emit('chat', socket.username, data);
    });
    
    socket.on('disconnect', function () {
        io.sockets.emit('chat', socket.username, socket.username + ', is gone, now.');
    });
});





    
