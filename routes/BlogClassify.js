const exporess = require('express');
const router = exporess.Router();
const BlogClasifyController = require('../controller/BlogClasifyController');
const { body, param } = require('express-validator');
const ValidationMiddleware = require('../middleware/ValidationMiddleware');

router.post('/create', [
    body('name').notEmpty().withMessage('名称不能为空'),
], ValidationMiddleware, BlogClasifyController.BlogClassifyCreate);

router.delete('/delete', [
    body('_id').notEmpty().withMessage('ID不能为空'),
], ValidationMiddleware, BlogClasifyController.BlogClassifyDelete);

router.put('/update', [
    body('_id').notEmpty().withMessage('ID不能为空'),
    body('name').notEmpty().withMessage('名称不能为空'),
    body('status').notEmpty().withMessage('状态不能为空'),
], ValidationMiddleware, BlogClasifyController.BlogClassifyUpdate);

router.post('/list', [
    body('pageIndex').notEmpty().withMessage('ID不能为空'),
    body('pageSize').notEmpty().withMessage('作者不能为空')
], ValidationMiddleware, BlogClasifyController.BlogClassifyPageQuery);

router.get('/:id', [
    param('_id').notEmpty().withMessage('ID不能为空'),
], ValidationMiddleware, BlogClasifyController.BlogClassifyById);

module.exports = router;