const { RequestLog } =  require('../model');
const JsonResponse = require("../utils/JsonResponse");

module.exports = {
    /**
     * 请求日志分页查询
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async RequestLogPageQuery(req, res, next) {
        try {
            const { pageIndex, pageSize, responseStatus, method } = req.body;
            //查询条件
            const query = {};
            if (responseStatus) {
                query.responseStatus = responseStatus;
            }
            if (method) {
                query.method = method;
            }
            const total = await RequestLog.find(query).countDocuments();
            const result = await RequestLog.find(query).sort({'timestamp': -1}).skip((pageIndex - 1) * pageSize).limit(pageSize);
            JsonResponse(res, 200, {
                total,
                items: result
            }, '查询成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message, 500);
        }
    }
}