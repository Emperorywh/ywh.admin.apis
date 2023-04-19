const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 博客标签
 */
const BlogLabel = new Schema({
    //标签名称
    name: {
        type: String,
        require: true
    },
    //状态：0停用，1正常，2删除
    status: {
        type: Number,
        require: true,
        default: 1
    }
});

module.exports = BlogLabel;