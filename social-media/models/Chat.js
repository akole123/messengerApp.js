const mongoose = require('mongoose');
const ChatSchema = mongoose.Schema({
    sender: {
        type: String,
        default: ''
    },
    receiver: {
        type: String,
        default: ''
    },
    chatLog: {
        type: Array,
        default: []
    },
});

module.exports = mongoose.model('chat', ChatSchema);