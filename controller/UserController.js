const { User } = require('../model/index');
const { validationResult } = require('express-validator');
const JsonWebToken = require("../middleware/JsonWebToken");
const JsonResponse = require("../utils/JsonResponse");

module.exports = {

    //用户注册
    async Register(req, res, next) {
        const user = req.body;
        const findUser = await User.findOne({ username: user.username });
        if (findUser) {
            JsonResponse(res, 500, null, '该用户已存在');
        } else {
            user.persionalProfile = '再见少年拉满弓，不惧岁月不惧风。';
            const newUser = new User(user);
            try {
                const userResponse = await newUser.save(newUser);
                JsonResponse(res, 200, userResponse, '注册成功');
            } catch {
                JsonResponse(res, 500, userResponse, '注册失败！');
            }
        }
    },

    //用户登录
    async Login(req, res, next) {

        // 检查参数验证结果
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 如果有错误，返回错误信息
            return JsonResponse(res, 500, null, errors.array());
        }
        const reqUser = req.body;
        const findUser = await User.findOne({
            username: reqUser.username
        });
        if (findUser) {
            if (findUser.password === reqUser.password) {
                //签发token
                const token = JsonWebToken.signToken(findUser._id);
                return JsonResponse(res, 200, {
                    token,
                    userInfo: findUser
                }, "登录成功");
            } else {
                return JsonResponse(res, 500, null, "密码错误");
            }
        } else {
            return JsonResponse(res, 500, null, "该用户不存在");
        }
    },

    async UserList(req, res, next) {
        const { pageIndex, pageSize, userId, username } = req.body;
        //查询条件
        const query = {};
        if (userId) {
            query.userId = userId;
        }
        if (username) {
            query.username = {
                $regex: new RegExp(username, 'i')
            };
        }
        try {
            //查询用户总数
            const totalUser = await User.countDocuments(query);
            //查询用户列表
            const userList = await User.find(query)
                .skip((pageIndex - 1) * pageSize)
                .limit(pageSize);
            JsonResponse(res, 200, {
                total: totalUser,
                userList,
            }, "查询成功");
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    }
}