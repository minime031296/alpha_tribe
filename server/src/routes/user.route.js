const {Router} = require('express')
const { RegisterUser, LoginUser} = require('../controller/userController')


const userRoutes = Router()

userRoutes.post('/register', RegisterUser)
userRoutes.post('/login', LoginUser)


module.exports = userRoutes