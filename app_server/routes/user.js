const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

/* GET user auth page. */
router.get('/', controller.user);

module.exports = router;
