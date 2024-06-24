const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.post('/request-reset-password', userCtrl.requestResetPassword);

module.exports = router;