const { BlogClassify } = require('../model');
const JsonResponse = require("../utils/JsonResponse");

module.exports = {
    /**
     * 创建博客分类
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogClassifyCreate(req, res, next) {
        try {
            const result = await BlogClassify.create(req.body);
            JsonResponse(res, 200, result, '创建成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 删除博客分类
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogClassifyDelete(req, res, next) {
        try {
            const result = await BlogClassify.findByIdAndUpdate(req.body._id, { status: 2 });
            JsonResponse(res, 200, result, '删除成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 更新博客分类
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogClassifyUpdate(req, res, next) {
        try {
            const result = await BlogClassify.findByIdAndUpdate(req.body._id, req.body);
            JsonResponse(res, 200, result, '更新成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 分页查询博客分类列表
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogClassifyPageQuery(req, res, next) {
        try {
            const { pageIndex, pageSize, name } = req.body;
            //查询条件
            const query = {};
            if (name) {
                query.name = {
                    $regex: new RegExp(name, 'i')
                }
            }
            const total = await BlogClassify.find(query).countDocuments();
            const result = await BlogClassify.find(query).skip((pageIndex - 1) * pageSize).limit(pageSize);
            JsonResponse(res, 200, {
                total,
                items: result
            }, '查询成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 根据ID查询博客分类
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogClassifyById(req, res, next) {
        try {
            const result = await BlogClassify.findById(req.params.id);
            JsonResponse(res, 200, result, '查询成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    }
}