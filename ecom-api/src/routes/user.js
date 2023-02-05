const router = require('express').Router()
const { authorization, authAdmin } = require('../middleware/auth.middleware.js')
const UserController = require('../controller/user.controller')


router.get('/stats', authAdmin, UserController.stats)
router.get('/:id', authorization, UserController.get)
router.put('/:id', authorization, UserController.update)
router.delete('/:id', authAdmin, UserController.delete)

router.get('/', authAdmin, UserController.list)

module.exports = router