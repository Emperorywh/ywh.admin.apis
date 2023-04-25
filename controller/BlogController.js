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
            const result = await Blog.updateMany({
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
     * 更新博客
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async BlogUpdate(req, res, next) {
        try {
            const blog = await Blog.findById(req.body._id);
            if (blog) {
                const updateData = {
                    ...blog._doc,
                    ...req.body,
                    updateAt: Date.now()
                }
                await Blog.findByIdAndUpdate(req.body._id, updateData);
                JsonResponse(res, 200, updateData, '更新成功');
            } else {
                JsonResponse(res, 500, null, "博客不存在");
            }
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
            const { pageIndex, pageSize, title, classification, label } = req.body;
            //查询条件
            const query = {
                status: {
                    $ne: 2
                }
            };
            if (title) {
                query.title = {
                    $regex: new RegExp(title, 'i')
                }
            }
            if (classification) {
                query.classification = classification;
            }
            if (label && label.length > 0) {
                query.label = {
                    $in: label
                }
            }
            const total = await Blog.find(query).countDocuments();
            const result = await Blog.find(query).skip((pageIndex - 1) * pageSize).limit(pageSize).populate("author", "-password").populate(["classification", "label"]);
            JsonResponse(res, 200, {
                total,
                items: result
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
            const prevBlog = await Blog.findOne({
                $or: [
                    { _id: { $lt: req.params.blogId } },
                    { _id: { $gt: req.params.blogId } }
                ],
                status: { $ne: 2 }
            }).sort({ _id: -1 });
            const nextBlog = await Blog.findOne({
                $or: [
                    { _id: { $gt: req.params.blogId } },
                    { _id: { $lt: req.params.blogId } }
                ],
                status: { $ne: 2 }
            }).sort({ _id: 1 });
            JsonResponse(res, 200, {
                blog: result,
                prevBlog,
                nextBlog
            }, '查询成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    }
}