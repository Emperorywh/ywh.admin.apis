const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    blogId: {
        type: mongoose.Types.ObjectId,
        ref: 'Blog'
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    from: {
        type: String,
        require: true
    },
    to: {
        type: mongoose.Types.ObjectId,
        type: String,
        ref: 'Comment',
        default: null
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
    },
    //留言类型：0：博客留言，1：留言板留言，2：关于我的留言
    commentType: {
        type: Number,
        require: true,
        default: 0
    }
});

module.exports = CommentSchema;