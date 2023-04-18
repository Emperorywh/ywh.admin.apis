const { User } = require('../model/index');
const { validationResult } = require('express-validator');

module.exports = {

    //用户注册
    async Register(req, res, next) {
        const user = req.body;
        const findUser = await User.findOne({ username: user.username });
        if (findUser) {
            res.json(ResponseResult(
                false,
                null,
                '该用户已存在'
            ));
        } else {
            user.persionalProfile = '再见少年拉满弓，不惧岁月不惧风。';
            const date = new Date();
            const newUser = new User(user);
            try {
                const userResponse = await newUser.save(newUser);
                res.json({
                    code: 200,
                    data: userResponse,
                    message: '注册成功'
                });
            } catch {
                res.json({
                    code: 500,
                    data: userResponse,
                    message: '注册失败！'
                });
            }
        }
    },

    //用户登录
    async Login(req, res, next) {
        
        // 检查参数验证结果
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 如果有错误，返回错误信息
            return res.status(400).json({
                code: 400,
                data: null,
                message: errors.array()
            });
        }
        const reqUser = req.body;
        const findUser = await User.findOne({
            username: reqUser.username
        });
        if (findUser) {
            if (findUser.password === reqUser.password) {
                res.json({
                    code: 200,
                    data: findUser,
                    message: '登录成功！'
                });
            } else {
                res.json({
                    code: 500,
                    data: null,
                    message: '密码错误！'
                });
            }
        } else {
            res.json({
                code: 500,
                data: null,
                message: '该用户不存在！'
            });
        }
    }
}