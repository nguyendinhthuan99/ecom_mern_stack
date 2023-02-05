const StripeService = require('../service/stripe.service.js')

class AuthController {
  pay = async (req, res, next) => {
    try{
      const chargeResponse = await StripeService.pay(req.body)
      console.log(chargeResponse)
      res.status(200).json(chargeResponse)
    }
    catch (err) {
      console.log('AuthController.pay: ' + err.message)
      res.status(500).json('Server Error!')
    }
  }
}

module.exports = new AuthController()