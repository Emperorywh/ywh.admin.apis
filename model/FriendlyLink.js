const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 友情链接
 */
const FriendlyLink = new Schema({
    //网站名称
    name: {
        type: String,
        require: true,
        trim: true
    },
    //网站地址
    url: {
        type: String,
        require: true,
        trim: true
    },
    //网站封面
    cover: {
        type: String,
        require: true,
        trim: true
    },
    //网站介绍
    desc: {
        type: String,
        require: true,
        trim: true
    },
    //备注
    remark: {
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
    //状态：0：停用、1：正常、2：删除、3：待审核
    status: {
        type: Number,
        default: 3,
        min: 0,
        max: 3
    },
    //排序
    sort: {
        type: Number,
        default: 0
    }
});

module.exports = FriendlyLink;