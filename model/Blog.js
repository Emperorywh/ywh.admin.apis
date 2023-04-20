const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    //作者
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    //标题
    title: {
        type: String,
        require: true,
        trim: true
    },
    //摘要
    abstract: {
        type: String,
        require: true,
        trim: true
    },
    //正文
    content: {
        type: String,
        require: true,
    },
    //分类
    classification: {
        type: Schema.Types.ObjectId,
        ref: 'BlogClassify',
        require: true
    },
    //标签
    label: {
        type: [Schema.Types.ObjectId],
        ref: 'BlogLabel',
        require: true,
    },
    //封面
    cover: {
        type: String,
        trim: true
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
    //状态：0：停用、1：正常、2：删除
    status: {
        type: Number,
        default: 1,
        min: 0,
        max: 2
    },
    //点赞数量
    likeNumber: {
        type: Number,
        default: 0
    },
    //评论数量
    commentNumber: {
        type: Number,
        default: 0
    },
    //阅读数量
    readNumber: {
        type: Number,
        default: 0
    }
});

module.exports = BlogSchema;