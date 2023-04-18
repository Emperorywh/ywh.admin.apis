const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/ywhAdmin');
const db = mongoose.connection;

db.on('error', err => {
    console.log('MongoDB连接出错', err);
});

db.once('open', () => {
    console.log('MongoDB连接成功!');
});

module.exports = {
    User: mongoose.model('User', require('./User'), 'user'),
}