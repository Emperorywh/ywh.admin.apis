const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();
const { body } = require('express-validator');
const JsonWebToken = require("../middleware/JsonWebToken");

router.post('/register', [
    body('username').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
    body('nickname').notEmpty().withMessage('昵称不能为空'),
], UserController.Register);

router.post('/login', [
    body('username').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
], UserController.Login);

router.post('/list', JsonWebToken.verifyToken, [
    body('pageIndex').notEmpty().withMessage('pageIndex不能为空'),
    body('pageSize').notEmpty().withMessage('pageSize不能为空'),
], UserController.UserList);

module.exports = router;