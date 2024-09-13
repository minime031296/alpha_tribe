const {connect} = require('mongoose')

const connectToDb = async (URL) => {
    await connect(URL)
} 

module.exports = connectToDb