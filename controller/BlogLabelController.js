const { BlogLabel } = require('../model/index');
const JsonResponse = require("../utils/JsonResponse");

module.exports = {
    /**
     * 创建博客标签
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogLabelCreate(req, res, next) {
        try {
            const result = await BlogLabel.create(req.body);
            JsonResponse(res, 200, result, '创建成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 删除博客标签
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogLabelDelete(req, res, next) {
        try {
            const result = await BlogLabel.findByIdAndUpdate(req.body._id, { status: 2 });
            JsonResponse(res, 200, result, '删除成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 更新博客标签
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogLabelUpdate(req, res, next) {
        try {
            const result = await BlogLabel.findByIdAndUpdate(req.body._id, req.body);
            JsonResponse(res, 200, result, '更新成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 分页查询博客标签列表
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogLabelPageQuery(req, res, next) {
        try {
            const { pageIndex, pageSize, name } = req.body;
            //查询条件
            const query = {};
            if (name) {
                query.name = {
                    $regex: new RegExp(name, 'i')
                }
            }
            const total = await BlogLabel.find(query).countDocuments();
            const result = await BlogLabel.find(query).skip((pageIndex - 1) * pageSize).limit(pageSize);
            JsonResponse(res, 200, {
                total,
                items: result
            }, '查询成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 根据ID查询博客标签
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogLabelById(req, res, next) {
        try {
            const result = await BlogLabel.findById(req.params.id);
            JsonResponse(res, 200, result, '查询成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    }
}