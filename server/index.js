require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
const {log} = require('console')
const {error} = require('console')
const connectToDb = require("./src/config/db")
const userRoutes = require("./src/routes/user.route")
const userIdRoutes = require("./src/routes/userId.route")
const stockRouter = require("./src/routes/stock.route")
const Port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send("welcome home page")
})

app.use('/api/auth', userRoutes)
app.use('/api/user', userIdRoutes)
app.use('/api', stockRouter)

app.listen(Port, async() => {
    try {
        await connectToDb(process.env.MONGO_URI)
        log(`Database connected`)
    } catch (error) {
        log(`Database not connected`)
    }
    log(`Server running at Port: ${Port}`)
})
