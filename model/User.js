const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    //登录账号
    username: {
        type: String,
        trim: true,
        require: true
    },
    //昵称
    nickname: {
        type: String,
        trim: true,
        require: true
    },
    //密码
    password: {
        type: String,
        trim: true,
        require: true,
    },
    //联系电话
    phone: {
        type: String,
        trim: true,
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
    //头像地址
    avatarUrl: {
        type: String,
        trim: true,
    },
    //微信openId
    openId: {
        type: String,
        trim: true,
    },
    //用户状态：0：停用、1：正常、2：删除
    status: {
        type: Number,
        default: 1,
        min: 0,
        max: 2
    },
    //个性签名
    persionalProfile: {
        type: String,
        trim: true,
    },
    //角色列表
    roles: {
        type: [String],
        default: []
    }
});

module.exports = UserSchema;