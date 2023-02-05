const router = require('express').Router()
const StripeController = require('../controller/stripe.controller.js')

router.post('/payment', StripeController.pay)

module.exports = router