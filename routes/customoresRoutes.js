const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer')
const customersController = require('../controllers/customersController')

router.get('/customers',customersController.getCustomer)
router.post('/customers',customersController.createCustomer)

module.exports = router