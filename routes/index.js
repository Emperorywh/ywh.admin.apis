const express = require('express');
const router = express.Router();

router.use('/user', require('./User'));
router.use('/blog', require('./Blog'));
router.use('/blogClassify', require('./BlogClassify'));
router.use('/blogLabel', require('./BlogLabel'));
router.use('/friendlyLink', require('./FriendlyLink'));
router.use('/comment', require('./Comment'));
router.use('/about', require('./AboutMe'));

module.exports = router;