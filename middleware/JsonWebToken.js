const jwt = require('jsonwebtoken');
const secret_key = "F3A484C2-6A73-0E7D-E490-3BA98470158F";

/**
 * 签发token
 * @param {*} userId 
 * @returns 
 */
const signToken = (userId) => {
    //生成token
    const token = jwt.sign({
        userId
    }, secret_key, {
        expiresIn: 60 * 60 * 24 * 30
    });
    return `Bearer ${token}`;
}

/**
 * 验证token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const verifyToken = (req, res, next) => {
    //不用验证token的url数组
    const withoutAuthUrl = [
        '/apis/user/login',
        '/apis/user/register',
        '/apis/blog/list',
        '/apis/blog/detail',
        '/apis/blogClassify/list',
        '/apis/blogLabel/list',
        '/apis/friendlyLink/list',
        '/apis/friendlyLink/create',
        '/apis/comment/create',
        '/apis/comment/list',
        '/apis/comment/message',
        '/apis/comment/aboutMessage',
        '/apis/about/findOne'
    ];
    const findWithoutUrl = withoutAuthUrl.find(item => req.originalUrl.includes(item));
    if (findWithoutUrl) {
        next();
    } else {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({
                code: 401,
                data: null,
                message: '无授权访问'
            });
        }
        const splitToken = token.split(' ')[1];
        if (splitToken) {
            try {
                const result = jwt.verify(splitToken, secret_key);
                // 将解码后的用户信息存储在请求对象中
                req.userId = result.userId;
                next();
            } catch (err) {
                return res.status(401).json({
                    code: 401,
                    data: null,
                    message: err.message
                });
            }

        } else {
            return res.status(401).json({
                code: 401,
                data: null,
                message: '无授权访问'
            });
        }
    }
}

module.exports = {
    signToken,
    verifyToken
}