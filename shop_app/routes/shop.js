const express = require('express');
const path = require('path');

const productsController = require('../controllers/products');

const router = express.Router();

const adminData = require('./admin');

router.get('/', productsController.getProducts);

module.exports = router;