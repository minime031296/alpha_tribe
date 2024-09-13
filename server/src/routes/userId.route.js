const {Router} = require('express')
const generateToken = require('../utils/GenerateToken')
const { GetUser, UpdateUser } = require('../controller/userController')


const userIdRoutes = Router()

userIdRoutes.get('/profile/:userId', generateToken, GetUser)
userIdRoutes.put('/profile/:userId', generateToken, UpdateUser)

module.exports = userIdRoutes