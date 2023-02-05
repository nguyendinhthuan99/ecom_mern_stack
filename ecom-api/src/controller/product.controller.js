const ProductService = require('../service/product.service')

class ProductController {
    async list(req, res, next) {
        try {
            const { limit, sort, ...query} = req.query || {}

            const listUser = await ProductService.getList(query, { limit, sort })

            res.status(200).json(listUser)
        } catch (err) {
            console.error('ProductController.list error: ' + err.message)
        }
    }

    async create(req, res, next) {
        try {
            const newProduct = req.body

            const responseProduct = await ProductService.create(newProduct)

            res.status(200).json(responseProduct)
        } catch (err) {
            console.error('ProductController.createProduct error: ' + err.message)
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id
            const data = req.body

            console.log(id, data)

            const responseProduct = await ProductService.update(id, data)

            res.status(200).json(responseProduct)
        } catch (err) {
            console.error('ProductController.update error: ' + err.message)
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params

            const deleteUserResponse = await ProductService.remove(id)

            res.status(200).json(deleteUserResponse)
        }
        catch (err) {
            console.error('ProductController.remove error: ' + err.message)
            res.status(500).json(err.message)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params

            const productResponse = await ProductService.getOne(id)

            res.status(200).json(productResponse)
        } catch (err) {
            console.error('ProductController.get error: ' + err.message)
            res.status(500).json(err.message)
        }
    }
}

module.exports = new ProductController()