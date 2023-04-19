const express = require('express');
const router = express.Router();

router.use('/user', require('./User'));
router.use('/blog', require('./Blog'));
router.use('/blogClassify', require('./BlogClassify'));
router.use('/blogLabel', require('./BlogLabel'));

module.exports = router;