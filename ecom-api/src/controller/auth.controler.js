const UserService = require('../service/user.service.js')

class AuthController {

  register = async (req, res, next) => {
    try {
      const createUserRes = await UserService.create(req.body)

      res.status(200).json(createUserRes)
    }
    catch (err) {
      res.status(500).json(err.message)

      console.error('AuthController.register error: ' + err.message)
    }
  }

  login = async (req, res, next) => {
    try{
      const resUserLogin = await UserService.login(req.body)

      res.status(200).json(resUserLogin)
    }
    catch (err) {
      res.status(401).json('wrong credentials!')
    }
  }
}

module.exports = new AuthController()