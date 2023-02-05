const Order = require("../model/Order.js")

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
    const newOrder = new Order(data)

    const resOrder = await newOrder.save()

    return resOrder
  }
  catch(err) {
    throw new Error('Register failed: ' + err.message)
  }
}

const update = async (id = '', data = {}) => {
  try {
    const ordertUpdated = await Order.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    )

    validData(ordertUpdated)

    return ordertUpdated
  }
  catch (err) {
    throw new Error('Updating failed: ', err.message)
  }
}

const remove = async (id = '') => {
  try {

    const orderDeleted = await Order.findByIdAndDelete({ _id: id })

    validData(orderDeleted)

    return orderDeleted
  }
  catch (err) {
    throw new Error('Remove Failed: ', err.message)
  }
}

const getOne = async (id = '') => {
  try {
    const order = await Order.findById({ _id: id })

    validData(order)

    return order
  }
  catch (err) {
    throw new Error(err.message)
  }
}

const getList = async (query = {}, options = {}) => {
  try {
    if (query?.categories?.length) query.categories = { $in: query.categories }

    if (options?.sort == 'y') options.sort = { createdAt: -1 }

    if (query?.user) {
      query.user.isAdmin ? query.user = {} : query.userId = query.user._id
    }

    const resOrder = await Order.find(query, options?.select, options)

    return resOrder
  }
  catch (err) {
    throw new Error('Order.service.getList :' + err.message)
  }
}

const stats = async (query) => {
  const productId = query?.pid

  const date = new Date()

  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))

  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

  try {
    const income = await Order.aggregate([
      {
        $match:
          { createdAt: { $gte: previousMonth},
            ...(productId && {
              products:
                { $elemMatch: { productId }}
            })
          }
      },
      {
        $project: {
          month: { $month: '$createdAt'},
          sales: '$amount'
      }},
      {
        $group: {
          _id: '$month',
          total:  { $sum: '$sales' }
        }
      }
    ])

    income.sort((a, b) => a._id - b._id)

    return income
  }
  catch (err) {
    throw new Error('Order.service.stats :' + err.message)
  }
}

module.exports = {
  stats,
  remove,
  getOne,
  update,
  create,
  getList
}