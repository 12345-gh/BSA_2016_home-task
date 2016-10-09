var express = require('express'),
    bodyPraser = require('body-parser'),
    socketio = require('socket.io'),
    app = express(),
    server = app.listen(7777, function () {
        console.log('App listening on port 7777!');
    }),
    io = socketio.listen(server),
    staticDir = __dirname + '/public/',
    messages = [],
    user = [];

app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({extended: false}));
app.use(express.static(staticDir));


app.get('/', function (req, res) {
    res.sendFile(staticDir + 'index.html')
});

io.on('connection', function (socket) {

    console.log('Client connected');

    socket.on('disconnected', function () {
        console.log('Client disconnected');
    });

    socket.on('chat message', function (msg) {
        messages.push(msg);
        io.emit('chat message', msg);
    });

    socket.on('chat user name', function (name) {
        var data = {
            result : 0,
            name : name
        };
        for (var i=0, length=user.length; i<length; i++){
            if (user[i]==name){
                data.result=1;
            }
        };

        if (data.result==0) {
            user.push(name);
        };
        io.emit('chat user name', data);
    });

    socket.emit('chat history', messages);
});