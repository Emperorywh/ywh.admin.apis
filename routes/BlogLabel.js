const exporess = require('express');
const router = exporess.Router();
const BlogLabelController = require('../controller/BlogLabelController');
const { body, param } = require('express-validator');
const ValidationMiddleware = require('../middleware/ValidationMiddleware');

router.post('/create', [
    body('name').notEmpty().withMessage('名称不能为空'),
], ValidationMiddleware, BlogLabelController.BlogLabelCreate);

router.delete('/delete', [
    body('_id').notEmpty().withMessage('ID不能为空'),
], ValidationMiddleware, BlogLabelController.BlogLabelDelete);

router.put('/update', [
    body('_id').notEmpty().withMessage('ID不能为空'),
    body('name').notEmpty().withMessage('名称不能为空'),
], ValidationMiddleware, BlogLabelController.BlogLabelUpdate);

router.post('/list', [
    body('pageIndex').notEmpty().withMessage('ID不能为空'),
    body('pageSize').notEmpty().withMessage('作者不能为空')
], ValidationMiddleware, BlogLabelController.BlogLabelPageQuery);

router.get('/:id', [
    param('_id').notEmpty().withMessage('ID不能为空'),
], ValidationMiddleware, BlogLabelController.BlogLabelById);

module.exports = router;