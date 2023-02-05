const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  img: {
    type: String,
    default: 'imgs/no-avatar.png'
  }
},
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)