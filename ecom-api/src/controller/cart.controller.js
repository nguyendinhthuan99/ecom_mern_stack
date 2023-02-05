const CartService = require('../service/cart.service.js')

class CartController {
    async list(req, res, next) {
        try {
            const { limit, sort, ...query} = req.query || {}

            query.user = req?.user

            const responseCart = await CartService.getList(query, { limit, sort })

            res.status(200).json(responseCart)
        } catch (err) {
            console.error('CartController.list error: ' + err.message)
        }
    }

    async create(req, res, next) {
        try {
            const newCart = req.body

            const responseCart = await CartService.create(newCart)

            res.status(200).json(responseCart)
        } catch (err) {
            console.error('CartController.createCart error: ' + err.message)
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id
            const data = req.body

            console.log(id, data)

            const responseCart = await CartService.update(id, data)

            res.status(200).json(responseCart)
        } catch (err) {
            console.error('CartController.update error: ' + err.message)
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params

            const deleteUserResponse = await CartService.remove(id)

            res.status(200).json(deleteUserResponse)
        }
        catch (err) {
            console.error('CartController.remove error: ' + err.message)
            res.status(500).json(err.message)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params

            const productResponse = await CartService.getOne(id)

            res.status(200).json(productResponse)
        } catch (err) {
            console.error('CartController.get error: ' + err.message)
            res.status(500).json(err.message)
        }
    }
}

module.exports = new CartController()