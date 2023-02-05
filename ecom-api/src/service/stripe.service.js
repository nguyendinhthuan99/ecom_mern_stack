const KEY = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(KEY)

const pay = async (data = {}) => {
  const chargeStatus = await stripe.charges.create({
    source: data?.tokenId,
    amount: data?.amount,
    currency: "usd"
  }).catch(err => err.message)

  return chargeStatus
}


module.exports = {
  pay
}