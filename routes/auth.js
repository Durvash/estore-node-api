const express = require('express');
const router = express.Router();

const { registerUser, loginUser, userAccount, userLogout } = require('../controllers/authController');

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/account').get(userAccount);
router.route('/logout').get(userLogout);

module.exports = router;