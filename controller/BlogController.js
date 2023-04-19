const { Blog } = require('../model/index');
const JsonResponse = require("../utils/JsonResponse");

module.exports = {
    /**
     * 创建博客
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogCreate(req, res, next) {
        try {
            const result = await Blog.create({
                ...req.body,
                author: req.userId
            });
            JsonResponse(res, 200, result, '创建成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 删除博客
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogDelete(req, res, next) {
        try {
            const result = await Blog.findByIdAndUpdate(req.body._id, { status: 2 });
            JsonResponse(res, 200, result, '删除成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 更新博客
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogUpdate(req, res, next) {
        try {
            const result = await Blog.findByIdAndUpdate(req.body._id, req.body);
            JsonResponse(res, 200, result, '更新成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 分页查询博客列表
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogPageQuery(req, res, next) {
        try {
            const { pageIndex, pageSize, title } = req.body;
            //查询条件
            const query = {};
            if (title) {
                query.title = {
                    $regex: new RegExp(title, 'i')
                }
            }
            const total = await Blog.find(query).countDocuments();
            const result = await Blog.find(query).skip((pageIndex - 1) * pageSize).limit(pageSize).populate("author", "-password").populate(["classification", "label"]);
            JsonResponse(res, 200, {
                total,
                blogList: result
            }, '查询成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 根据ID查询博客
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogById(req, res, next) {
        try {
            const result = await Blog.findById(req.params.blogId).populate("author", "-password").populate(["classification", "label"]);
            JsonResponse(res, 200, result, '查询成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    }
}