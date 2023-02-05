const router = require('express').Router()
const AuthController = require('../controller/auth.controler.js')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router