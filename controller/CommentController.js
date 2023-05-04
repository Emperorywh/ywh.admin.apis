const { Comment } = require("../model");
const JsonResponse = require("../utils/JsonResponse");
const gravatar = require('gravatar');
const sendEmail = require('../utils/senEmail');

module.exports = {
    /**
     * 添加评论
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async CommentCreate(req, res, next) {
        try {
            req.body.createAt = Date.now();
            req.body.avatarUrl = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'retro'}, true);
            const result = await Comment.create(req.body);
            sendEmail(req.body);
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
            }).sort({'createAt': -1}).populate("to");
            JsonResponse(res, 200, result, '查询成功');
        } catch (error) {
            JsonResponse(res, 500, null, error.message);
        }
    },

    /**
     * 查询留言板留言
     */
    async CommentListByMessage(req, res, next) {
        try {
            const result = await Comment.find({
                commentType: 1
            }).sort({'createAt': -1}).populate("to");
            JsonResponse(res, 200, result, '查询成功');
        } catch (error) {
            JsonResponse(res, 500, null, error.message);
        }
    },

    /**
     * 查询关于我留言
     */
    async CommentListByAboutMessage(req, res, next) {
        try {
            const result = await Comment.find({
                commentType: 2
            }).sort({'createAt': -1}).populate("to");
            JsonResponse(res, 200, result, '查询成功');
        } catch (error) {
            JsonResponse(res, 500, null, error.message);
        }
    },
}