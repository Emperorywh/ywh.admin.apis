const { Comment } = require("../model");
const JsonResponse = require("../utils/JsonResponse");

module.exports = {
    /**
     * 添加评论
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async CommentCreate(req, res, next) {
        try {
            const result = await Comment.create(req.body);
            JsonResponse(res, 200, result, '创建成功');
        } catch (error) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 根据博客ID查询评论列表
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async CommentListByBlogId(req, res, next) {
        try {
            const result = await Comment.find({
                blogId: req.body.blogId
            });
            JsonResponse(res, 200, result, '查询成功');
        } catch (error) {
            JsonResponse(res, 500, null, err.message);
        }
    }
}