const router = require('express').Router()
const { authorization, authAdmin, verifyToken } = require('../middleware/auth.middleware.js')
const OrderController = require('../controller/order.controller.js')

router.get('/stats', authAdmin, OrderController.stats)

router.get('/:id', authAdmin, OrderController.getOne)
router.put('/:id', authAdmin, OrderController.update)
router.delete('/:id', authAdmin, OrderController.remove)

router.post('/', verifyToken, OrderController.create)
router.get('/', authorization, OrderController.list)

module.exports = router