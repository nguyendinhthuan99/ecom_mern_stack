const Product = require("../model/Product.js")

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
    const newProduct = new Product(data)

    const resProduct = await newProduct.save()

    return resProduct
  }
  catch(err) {
    throw new Error('Register failed: ' + err.message)
  }
}

const update = async (id = '', data = {}) => {
  try {
    const productUpdated = await Product.findOneAndUpdate(
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

    const productDeleted = await Product.findByIdAndDelete({ _id: id })

    validData(productDeleted)

    return productDeleted
  }
  catch (err) {
    throw new Error('Remove Failed: ', err.message)
  }
}

const getOne = async (id = '') => {
  try {
    const product = await Product.findById({ _id: id })

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

    const allUsers = await Product.find(query, options?.select, options)

    return allUsers
  }
  catch (err) {
    throw new Error('Product.service.getList :' + err.message)
  }
}

module.exports = {
  remove,
  getOne,
  update,
  create,
  getList
}