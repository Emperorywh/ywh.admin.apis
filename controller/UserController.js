const { User } = require('../model/index');

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
            user.createAt = date.toLocaleString();
            user.updateAt = date.toLocaleString();
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