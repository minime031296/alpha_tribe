const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateToken = (req, res, next) => {
    const accessToken = req.headers.authorization?.split(' ')[1]|| req.headers.Authorization?.split(' ')[1]

    if(!accessToken) {
        return res.status(401).json({error: "Access token is missing"})
    }

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).json({ error: 'Invalid access token' });
        }
        req.userId = decoded.userId
        next()
    }) 

}

module.exports = generateToken