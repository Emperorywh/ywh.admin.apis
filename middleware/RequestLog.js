const { RequestLog } = require('../model');
/**
 * 请求日志中间件
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const RequestLogMiddleWare = (req, res, next) => {
    res.on('finish', async () => {
        const filterArray = [
            '/apis/requestLog/list'
        ];
        const findFilter = filterArray.find(item => item === req.originalUrl);
        if (findFilter) return;
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