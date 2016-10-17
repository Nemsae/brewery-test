const express = require('express');
const router = express.Router();

router.use('/beer', require('./beer'));

module.exports = router;
