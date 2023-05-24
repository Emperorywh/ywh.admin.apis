const express = require('express');
const router = express.Router();
const personalSignatureController = require('../controller/PersonalSignature');
const { body } = require('express-validator');
const ValidationMiddleware = require('../middleware/ValidationMiddleware');

router.post('/create', [
    body('content').notEmpty().withMessage('内容不能为空'),
], ValidationMiddleware, personalSignatureController.PersonalSignatureCreate);

router.delete('/delete', [
    body().notEmpty().withMessage('ID不能为空'),
], ValidationMiddleware, personalSignatureController.PersonalSignatureDelete);

router.put('/update', [
    body('_id').notEmpty().withMessage('ID不能为空'),
    body('content').notEmpty().withMessage('内容不能为空'),
], ValidationMiddleware, personalSignatureController.PersonalSignatureUpdate);

router.post('/list', [
    body('pageIndex').notEmpty().withMessage('ID不能为空'),
    body('pageSize').notEmpty().withMessage('作者不能为空')
], ValidationMiddleware, personalSignatureController.PersonalSignaturePageQuery);

module.exports = router;
