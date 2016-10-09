var express = require('express'),
	bodyPraser = require('body-parser'),
	socketio = require('socket.io'),
	app = express(),
	server = app.listen(7777, function () {
		console.log('App listening on port 7777!');
	}),
	staticDir = __dirname + '/public/';

app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({extended: false}));
app.use(express.static(staticDir));

var mongoose = require('mongoose');
// mongoose.set('debug', true);  // enable if necessary
var mongooseOptions = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://peter:111111@ds037175.mlab.com:37175/nodejs_chat';

mongoose.connect(mongodbUri, mongooseOptions);

var conn = mongoose.connection;

conn.on('error', function() {
	console.error('MONGO ERROR!');
	console.error.bind(console, 'MongoDB connection error:');
});

conn.once('open', function() {
	console.log('MongoDB connection openned');
});

var ChatLog = require('./models/chatLog.js');

function saveChatLog(nickname, newMessage){
	// save the new ChatLog
	var newChatLog = new ChatLog({
		timestamp: Date.now(),
		name: nickname,
		text: newMessage
	});
	newChatLog.save(function(err) {
		if (err) throw err;
		console.log('newChatLog saved successfully! ['+nickname+' : '+newMessage+']');
	});
}

app.get('/', function (req, res){
	res.sendFile(staticDir + 'index.html')
});

app.get('/messages', function (req,res){
	var date = req.query.lhm;
	console.log('***', date);
	// load earlier messages
	ChatLog.find({timestamp: {$gt: date}}).sort({'timestamp': -1}).limit(5).exec(function(err, messages){
		if (err) throw err;

		messages.reverse(); // so that it is in chronological order

		res.json(messages);
	});


});

app.post('/messages', function (req, res){
	var message = req.body;
	saveChatLog(message.name, message.text);
	res.json(message);
});
