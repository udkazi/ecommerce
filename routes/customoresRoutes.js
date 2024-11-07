const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer')
const customersController = require('../controllers/customersController')



router.get('/customers',customersController.getAllCustomer)
router.get('/customers/:id',customersController.getSingleCustomer)
router.put('/customers/:id',customersController.updateSingleCustomer)
router.delete('/customers/:id',customersController.deleteSingleCustomer)
router.post('/customers',customersController.createCustomer)
router.post('/login',customersController.loginCustomer)

module.exports = router