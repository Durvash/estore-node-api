const express = require('express');
const router = express.Router();

const { newOrder, getOrderList } = require('../controllers/orderController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/orders').get(isAuthenticatedUser, getOrderList);

module.exports = router;