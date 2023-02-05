const router = require('express').Router()
const { authorization, authAdmin } = require('../middleware/auth.middleware.js')
const ProductController = require('../controller/product.controller.js')


router.get('/:id', ProductController.getOne)
router.put('/:id', authAdmin, ProductController.update)
router.delete('/:id', authAdmin, ProductController.remove)

router.get('/', ProductController.list)
router.post('/', authAdmin, ProductController.create)

module.exports = router