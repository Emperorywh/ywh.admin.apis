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
    },
    //创建时间
    createAt: {
        type: Number,
        default: Date.now()
    },
    //更新时间
    updateAt: {
        type: Number,
        default: Date.now()
    },
    //排序
    sort: {
        type: Number,
        require: true,
        default: 0 
    }
});

module.exports = BlogLabel;