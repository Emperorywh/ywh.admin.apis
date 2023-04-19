const { validationResult } = require('express-validator');
const JsonResponse = require("../utils/JsonResponse");

/**
 * 统一校验中间件
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const ValidationMiddleware = (req, res, next) => {
    // 检查参数验证结果
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // 如果有错误，返回错误信息
        let errorMessage = '';
        errors.array().forEach(item => {
            errorMessage = errorMessage.concat(item.msg + '、');
        });
        return JsonResponse(res, 500, null, errorMessage);
    }
    next();
}

module.exports = ValidationMiddleware;