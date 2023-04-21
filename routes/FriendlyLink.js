const express = require('express');
const router = express.Router();
const FriendlyLinkController = require('../controller/FriendlyLinkController');
const { body } = require('express-validator');
const ValidationMiddleware = require('../middleware/ValidationMiddleware');

router.post('/create', [
    body('name').notEmpty().withMessage('网站名称不能为空'),
    body('url').notEmpty().withMessage('网站地址不能为空'),
    body('cover').notEmpty().withMessage('网站封面不能为空'),
    body('desc').notEmpty().withMessage('网站描述不能为空'),
], ValidationMiddleware, FriendlyLinkController.FriendlyLinkCreate);

router.delete('/delete', [
    body().notEmpty().withMessage('ID不能为空'),
], ValidationMiddleware, FriendlyLinkController.FriendlyLinkDelete);

router.put('/update', [
    body('_id').notEmpty().withMessage('ID不能为空'),
    body('name').notEmpty().withMessage('网站名称不能为空'),
    body('url').notEmpty().withMessage('网站地址不能为空'),
    body('cover').notEmpty().withMessage('网站封面不能为空'),
    body('desc').notEmpty().withMessage('网站描述不能为空'),
    body('status').notEmpty().withMessage('网站状态不能为空'),
], ValidationMiddleware, FriendlyLinkController.FriendlyLinkUpdate);

router.post('/list', [
    body('pageIndex').notEmpty().withMessage('pageIndex不能为空'),
    body('pageSize').notEmpty().withMessage('pageSize不能为空')
], ValidationMiddleware, FriendlyLinkController.FriendlyLinkPageQuery);


module.exports = router;