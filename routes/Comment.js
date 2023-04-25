const express = require("express");
const router = express.Router();
const CommentController = require("../controller/CommentController");
const { body } = require('express-validator');
const ValidationMiddleware = require('../middleware/ValidationMiddleware');

router.post("/create", [
    body('from').notEmpty().withMessage('发起者不能为空'),
    body('email').notEmpty().withMessage('邮箱不能为空'),
    body('content').notEmpty().withMessage('内容不能为空')
], ValidationMiddleware, CommentController.CommentCreate);

router.post("/list", [
    body('blogId').notEmpty().withMessage('博客ID不能为空')
], ValidationMiddleware, CommentController.CommentListByBlogId);

module.exports = router;