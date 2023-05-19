const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestLog = new Schema({
    ip: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    requestBody: {
        type: mongoose.Schema.Types.Mixed
    },
    responseStatus: {
        type: Number,
        required: true
    },
    responseBody: {
        type: mongoose.Schema.Types.Mixed
    },
    timestamp: {
        type: Number,
        default: Date.now
    },
    message: {
        type: String
    }
});

module.exports = RequestLog;