const express = require('express');
const router = express.Router();
const BlogController = require('../controller/BlogController');
const { body, param } = require('express-validator');
const ValidationMiddleware = require('../middleware/ValidationMiddleware');

router.post('/create', [
    body('title').notEmpty().withMessage('标题不能为空'),
    body('abstract').notEmpty().withMessage('摘要不能为空'),
    body('content').notEmpty().withMessage('正文不能为空'),
    body('classification').notEmpty().withMessage('分类不能为空'),
    body('label').notEmpty().withMessage('标签不能为空')
], ValidationMiddleware, BlogController.BlogCreate);

router.delete('/delete', [
    body().notEmpty().withMessage('ID不能为空'),
], ValidationMiddleware, BlogController.BlogDelete);

router.put('/update', [
    body('_id').notEmpty().withMessage('ID不能为空'),
    body('author').notEmpty().withMessage('作者不能为空'),
    body('title').notEmpty().withMessage('标题不能为空'),
    body('abstract').notEmpty().withMessage('摘要不能为空'),
    body('content').notEmpty().withMessage('正文不能为空'),
    body('classification').notEmpty().withMessage('分类不能为空'),
    body('label').notEmpty().withMessage('标签不能为空')
], ValidationMiddleware, BlogController.BlogUpdate);

router.post('/list', [
    body('pageIndex').notEmpty().withMessage('pageIndex不能为空'),
    body('pageSize').notEmpty().withMessage('pageSize不能为空')
], ValidationMiddleware, BlogController.BlogPageQuery);

router.get('/:blogId', [
    param('blogId').notEmpty().withMessage('ID不能为空'),
], ValidationMiddleware, BlogController.BlogById);

module.exports = router;