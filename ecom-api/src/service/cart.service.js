const Cart = require("../model/Cart.js")

const validData= (data) => {
  try{
    if(!data)
      throw new Error('Not Found!')
  }
  catch(err){
    throw new Error(err.message)
  }
}

const create = async (data) => {
  try {
    const newCart = new Cart(data)

    const resCart = await newCart.save()

    return resCart
  }
  catch(err) {
    throw new Error('Register failed: ' + err.message)
  }
}

const update = async (id = '', data = {}) => {
  try {
    const productUpdated = await Cart.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    )

    validData(productUpdated)

    return productUpdated
  }
  catch (err) {
    throw new Error('Updating failed: ', err.message)
  }
}

const remove = async (id = '') => {
  try {

    const productDeleted = await Cart.findByIdAndDelete({ _id: id })

    validData(productDeleted)

    return productDeleted
  }
  catch (err) {
    throw new Error('Remove Failed: ', err.message)
  }
}

const getOne = async (id = '') => {
  try {
    const product = await Cart.findById({ _id: id })

    validData(product)

    return product
  }
  catch (err) {
    throw new Error(err.message)
  }
}

const getList = async (query = {}, options = {}) => {
  try {
    if (query?.categories?.length) query.categories = { $in: query.categories }

    if (options?.sort == 'newest') options.sort = { createdAt: -1 }

    if (query?.user) {
      query.user.isAdmin ? query.user = {} : query.userId = query.user._id
    }

    const resCart = await Cart.find(query, options?.select, options)

    return resCart
  }
  catch (err) {
    throw new Error('Cart.service.getList :' + err.message)
  }
}

module.exports = {
  remove,
  getOne,
  update,
  create,
  getList
}