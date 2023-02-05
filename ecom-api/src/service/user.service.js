const User = require("../model/User")
const { hashPassword, unhashPassword, createToken} = require('../service/auth.service.js')

const validUser = (user) => {
  try{
    if(!user)
      throw new Error('user not found')
  }
  catch(err){
    throw new Error(err.message)
  }
}

const validPassword = (requestPassword, userPassword) => {
  try{
    const unhashUserPassword = unhashPassword(userPassword)

    if(requestPassword !== unhashUserPassword)
      throw new Error('wrong password')
  }
  catch(err){
    throw new Error(err.message)
  }
}

const hiddenPassword = (user) => {
  let responseUser = {}

  if(user?._doc) {
    let { password, ...rest } = user._doc
    responseUser = rest
  }
  else {
    let { password, ...rest } = user
    responseUser = rest
  }

  return responseUser
}

const addAccessToken = (user) => {
  const { _id, isAdmin } = user

  const accessToken = createToken({ _id, isAdmin })

  return {...user._doc, accessToken}
}

const create = async (data) => {
  try {
    const { password, ...otherData } = data

    const newUser = new User({
      ...otherData,
      password: hashPassword(password)
    })

    const resUser = await newUser.save()

    return hiddenPassword(resUser)
  }
  catch(err) {
    throw new Error('Register failed: ' + err.message)
  }
}

const login = async (data) => {
  const { username, password } = data

  const user = await User.findOne(
    { $or: [{ username }, { email:  username }] }
  )

  validUser(user)

  validPassword(password, user.password)

  const userWithToken = addAccessToken(user)

  return hiddenPassword(userWithToken)
}

const update = async (req) => {
  if (req?.body?.password) {
    req.body.password = hashPassword(req.body.password)
  }
  try {
    const { id } = req.params

    const data = req.body

    const updateUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    )

    validUser(updateUser)

    return hiddenPassword(updateUser)
  }
  catch (err) {
    throw new Error(err.message)
  }
}

const deleteUser = async (userId) => {
  try {
    const userDeleted = await User.findOneAndDelete(userId)

    validUser(userDeleted)

    return hiddenPassword(userDeleted)
  }
  catch (err) {
    throw new Error(err.message)
  }
}

const getOne = async (userId) => {
  try {
    const userDeleted = await User.findById({ _id: userId })

    validUser(userDeleted)

    return hiddenPassword(userDeleted)
  }
  catch (err) {
    throw new Error(err.message)
  }
}

const getList = async (query, options = {}) => {
  try {
    if (options?.sort == 'y') options.sort = { createdAt: -1 }

    const allUsers = await User.find(query, options?.select, options)

    return allUsers
  }
  catch (err) {
    throw new Error(err.message)
  }
}

const stats = async (params) => {
  const date = new Date()

  date.setFullYear(2021)

  try{
    const statsData = await User.aggregate([
      { $match: { createdAt: { $gte: date }}},
      { $sort: { createdAt: 1 }},
      {
        $project: {
          month: { $month: '$createdAt' },
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }
        }
      }
    ])

    statsData.sort((a, b) => a._id - b._id)

    return statsData
  }
  catch (err) {

  }
}
module.exports = {
  stats,
  login,
  getOne,
  update,
  create,
  getList,
  validUser,
  deleteUser,
}