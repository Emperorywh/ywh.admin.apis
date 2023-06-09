const { User } = require('../model/index');
const JsonWebToken = require("../middleware/JsonWebToken");
const JsonResponse = require("../utils/JsonResponse");
const UploadFile = require("../utils/UploadFile");

module.exports = {

    /**
     * 用户注册
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
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

    /**
     * 用户登录
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async Login(req, res, next) {
        const reqUser = req.body;
        const findUser = await User.findOne({
            username: reqUser.username
        });
        if (findUser) {
            if (findUser.password === reqUser.password) {
                //签发token
                const token = JsonWebToken.signToken(findUser._id);
                const resultUser = JSON.parse(JSON.stringify(findUser));
                delete resultUser.password;
                return JsonResponse(res, 200, {
                    token,
                    userInfo: resultUser
                }, "登录成功");
            } else {
                return JsonResponse(res, 500, null, "密码错误");
            }
        } else {
            return JsonResponse(res, 500, null, "该用户不存在");
        }
    },

    /**
     * 分页查询用户列表
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
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
    },

    /**
     * 用户上传图片
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async UploadImage(req, res, next) {
        const response = await UploadFile(req);
        if (response.code === 200) {
            JsonResponse(res, 200, response.data, response.message);
        } else {
            JsonResponse(res, 500, null, response.message);
        }
    },

    /**
     * 用户上传博客图片
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async UploadBlogImage(req, res, next) {
        const response = await UploadFile(req);
        if (response.code === 200) {
            const url = response.data;
            const fileName = url.split("/").pop();
            res.status(200).json({
                "msg": "上传成功！",
                "code": 0,
                "data": {
                    "errFiles": [],
                    "succMap": {
                        [fileName]: url
                    }
                }
            })
        } else {
            res.status(200).json({
                errno: 1,
                data: {
                    message: response.message
                }
            })
        }
    },

}