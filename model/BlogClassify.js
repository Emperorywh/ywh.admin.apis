const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 博客分类
 */
const BlogClassify = new Schema({
    //分类名称
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
        type: Date,
        default: Date.now()
    },
    //更新时间
    updateAt: {
        type: Date,
        default: Date.now()
    },
    //排序
    sort: {
        type: Number,
        require: true,
        default: 0 
    }
});

module.exports = BlogClassify;