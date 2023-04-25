const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    blogId: {
        type: mongoose.Types.ObjectId
    },
    parent: {
        type: mongoose.Types.ObjectId
    },
    from: {
        type: String,
        require: true
    },
    to: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    avatarUrl: {
        type: String,
        default: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        require: true
    },
    content: {
        type: String,
        require: true
    },
    createAt: {
        type: Number,
        require: true,
        default: Date.now()
    }
});

module.exports = CommentSchema;