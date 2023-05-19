const { RequestLog } = require('../model');
/**
 * 请求日志中间件
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const RequestLogMiddleWare = (req, res, next) => {
    res.on('finish', async () => {
        try {
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            const requestLog = new RequestLog({
                method: req.method,
                url: req.originalUrl,
                requestBody: req.body,
                responseStatus: res.statusCode,
                responseBody: res.locals.data,
                message: res.locals.message,
                timestamp: Date.now(),
                ip,
            });
            await requestLog.save();
        } catch (error) {
            console.error(error);
        }
    });
    next();
}

module.exports = RequestLogMiddleWare;