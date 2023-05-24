const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 个性签名
 */
const PersonalSignature = new Schema({
    content: {
        type: String,
        require: true
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
});

module.exports = PersonalSignature;