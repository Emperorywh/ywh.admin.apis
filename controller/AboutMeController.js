const { AboutMe } = require("../model");
const JsonResponse = require("../utils/JsonResponse");

module.exports = {
    /**
     * 创建关于我
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async AboutCreate(req, res, next) {
        try {
            const result = await AboutMe.create(req.body);
            JsonResponse(res, 200, result, '创建成功');
        } catch (error) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 更新关于我
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async AboutMeUpdate(req, res, next) {
        try {
            req.body.updateAt = Date.now();
            await AboutMe.findByIdAndUpdate(req.body._id, req.body);
            JsonResponse(res, 200, true, '更新成功');
        } catch (error) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 查询关于我
     */
    async AboutMeFindOne(req, res, next) {
        try {
            const result = await AboutMe.findOne();
            JsonResponse(res, 200, result, '查询成功');
        } catch (error) {
            JsonResponse(res, 500, null, err.message);
        }
    }
}