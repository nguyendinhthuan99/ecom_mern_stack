const UserService = require('../service/user.service.js')

class UserController {
    async list(req, res, next) {
        try {
            const { limit, sort, ...query} = req.query || {}

            const listUser = await UserService.getList(query, { limit, sort })

            res.status(200).json(listUser)
        } catch (err) {
            console.error('UserController.getListUsers error: ' + err.message)
        }
    }

    async createUser(req, res, next) {
        try {
            const userName = req.body.username
            console.log(userName)
            res.send(`createUser: ${userName}`)
        } catch (err) {
            console.error('UserController.createUser error: ' + err.message)
        }
    }

    async update(req, res, next) {
        try {
            const userUpdateResponse = await UserService.update(req)
            res.status(200).json(userUpdateResponse)
        } catch (err) {
            console.error('UserController.editUser error: ' + err.message)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const deleteUserResponse = await UserService.deleteUser(id)
            res.status(200).json(deleteUserResponse)
        }
        catch (err) {
            console.error('UserController.delete error: ' + err.message)
        }
    }

    async get(req, res, next) {
        try {
            const { id } = req.params
            const getUserResponse = await UserService.getOne(id)
            res.status(200).json(getUserResponse)
        } catch (err) {
            console.error('UserController.get error: ' + err.message)
        }
    }

    async stats(req, res, next) {
        const params = ''
        try {
            const statsResponse = await UserService.stats(params)
            res.status(200).json(statsResponse)
        } catch (err) {
            console.error('UserController.stats error: ' + err.message)
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = new UserController()