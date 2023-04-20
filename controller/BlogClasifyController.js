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
     * 删除博客分类（软删除）
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogClassifyDelete(req, res, next) {
        try {
            const result = await BlogClassify.updateMany({
                _id: {
                    $in: req.body
                }
            }, { status: 2 });
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
            const find = await BlogClassify.findById(req.body._id);
            if (find) {
                const updateData = {
                    ...find._doc,
                    ...req.body,
                    updateAt: Date.now()
                }
                await BlogClassify.findByIdAndUpdate(req.body._id, updateData);
                JsonResponse(res, 200, updateData, '更新成功');
            } else {
                JsonResponse(res, 500, null, "该分类不存在");
            }
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
            const query = {
                status: {
                    $ne: 2
                }
            };
            if (name) {
                query.name = {
                    $regex: new RegExp(name, 'i')
                }
            }
            const total = await BlogClassify.find(query).countDocuments();
            const result = await BlogClassify.find(query).sort('sort').skip((pageIndex - 1) * pageSize).limit(pageSize);
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