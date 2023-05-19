/**
 * 
 * @param {*} res 请求对象
 * @param {*} code 返给前端的code
 * @param {*} data 返给前端的数据
 * @param {*} message 返给前端的消息
 * @param {*} httpStatus http状态码
 */
const JsonResponse = (res, code, data, message, httpStatus = 200) => {
    res.locals.code = code;
    res.locals.data = data;
    res.locals.message = message;
    res.status(httpStatus).json({
        code,
        data,
        message
    });
}

module.exports = JsonResponse;