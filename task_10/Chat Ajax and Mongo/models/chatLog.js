var mongoose = require('mongoose');

var chatLogSchema = new mongoose.Schema({
    timestamp: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    text: String
});

module.exports = mongoose.model('chat-log', chatLogSchema);