const router = require('express').Router()
const { authorization, authAdmin } = require('../middleware/auth.middleware.js')
const CartController = require('../controller/cart.controller.js')

router.get('/:id', authorization, CartController.getOne)
router.put('/:id', authorization, CartController.update)
router.delete('/:id', authorization, CartController.remove)

router.post('/', authorization, CartController.create)
router.get('/', authorization, CartController.list)

module.exports = router