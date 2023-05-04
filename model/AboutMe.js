const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 关于我
 */
const AboutMe = new Schema({
    content: {
        type: String,
        require: true
    },
    createAt: {
        type: Number,
        require: true,
        default: Date.now()
    },
    updateAt: {
        type: Number,
        require: true,
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

module.exports = AboutMe;