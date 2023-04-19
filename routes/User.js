const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const { body } = require('express-validator');
const ValidationMiddleware = require('../middleware/ValidationMiddleware');

router.post('/register', [
    body('username').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
    body('nickname').notEmpty().withMessage('昵称不能为空'),
], ValidationMiddleware, UserController.Register);

router.post('/login', [
    body('username').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
], ValidationMiddleware, UserController.Login);

router.post('/list', [
    body('pageIndex').notEmpty().withMessage('pageIndex不能为空'),
    body('pageSize').notEmpty().withMessage('pageSize不能为空'),
], ValidationMiddleware, UserController.UserList);

module.exports = router;