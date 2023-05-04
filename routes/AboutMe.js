const express = require('express');
const router = express.Router();
const AboutController = require('../controller/AboutMeController');
const { body } = require('express-validator');
const ValidationMiddleware = require('../middleware/ValidationMiddleware');

router.post('/create', [
    body('content').notEmpty().withMessage('内容不能为空')
], ValidationMiddleware, AboutController.AboutCreate);

router.post('/update', [
    body('_id').notEmpty().withMessage('ID不能为空'),
    body('content').notEmpty().withMessage('内容不能为空')
], ValidationMiddleware, AboutController.AboutMeUpdate);

router.post('/findOne', AboutController.AboutMeFindOne);

module.exports = router;