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
    avatarUrl: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
});

module.exports = CommentSchema;