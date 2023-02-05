const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const unhashPassword = (password) => {
  return CryptoJS.AES.decrypt(
    password,
    process.env.SECRET_PASSWORD_HASH_KEY
    ).toString(CryptoJS.enc.Utf8)
}

const hashPassword = (password) => {
  return CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_PASSWORD_HASH_KEY
  ).toString()
}

const createToken = (dataForHash) => {
  return jwt.sign(
    dataForHash,
    process.env.JWT_SECRET_KEY,
    { expiresIn : process.env.JWT_EXPIRED_TIME }
  )
}

module.exports = {
  createToken,
  hashPassword,
  unhashPassword
}
