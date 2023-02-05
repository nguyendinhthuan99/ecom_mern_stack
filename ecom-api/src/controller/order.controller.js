const OrderService = require('../service/order.service.js')

class OrderController {
    async list(req, res, next) {
        try {
            const { limit, sort, ...query} = req.query || {}

            query.user = req?.user

            const responseOrder = await OrderService.getList(query, { limit, sort })

            res.status(200).json(responseOrder)
        } catch (err) {
            console.error('OrderController.list error: ' + err.message)
        }
    }

    async create(req, res, next) {
        try {
            const newOrder = req.body

            newOrder.userId = req?.user?._id

            const responseOrder = await OrderService.create(newOrder)

            res.status(200).json(responseOrder)
        } catch (err) {
            console.error('OrderController.createOrder error: ' + err.message)
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id
            const data = req.body

            console.log(id, data)

            const responseOrder = await OrderService.update(id, data)

            res.status(200).json(responseOrder)
        } catch (err) {
            console.error('OrderController.update error: ' + err.message)
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params

            const deleteUserResponse = await OrderService.remove(id)

            res.status(200).json(deleteUserResponse)
        }
        catch (err) {
            console.error('OrderController.remove error: ' + err.message)
            res.status(500).json(err.message)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params

            const productResponse = await OrderService.getOne(id)

            res.status(200).json(productResponse)
        } catch (err) {
            console.error('OrderController.get error: ' + err.message)

            res.status(500).json(err.message)
        }
    }

    async stats(req, res, next) {
        try{
            const query = req.query

            const productResponse = await OrderService.stats(query)

            res.status(200).json(productResponse)
        } catch (err) {
            console.error('OrderController.get error: ' + err.message)
            res.status(500).json(err.message)
        }
    }
}

module.exports = new OrderController()