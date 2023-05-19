const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const requestLogController = require('../controller/RequestLogController');
const ValidationMiddleware = require('../middleware/ValidationMiddleware');

router.post('/list', [
    body('pageIndex').notEmpty().withMessage('pageIndex不能为空'),
    body('pageSize').notEmpty().withMessage('pageSize不能为空'),
], ValidationMiddleware, requestLogController.RequestLogPageQuery);

module.exports = router;