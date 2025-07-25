const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/:customer_id/overview', customerController.getCustomerOverview);

module.exports = router;
