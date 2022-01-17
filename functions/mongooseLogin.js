const mongoose = require('mongoose')

module.exports = ({ app, express }) => {
    express.mongooseLogin = async () => {

        mongoose.Promise = global.Promise
        mongoose.connect(process.env.MAPLECLUB_MONGODB)

        mongoose.connection.on('connected', async () => {
            console.log(`Mongoose Connected to Project MapleClub Database.`)
        })

        mongoose.connection.on('disconnected', async () => {
            console.log(`Mongoose Disconnected from Project MapleClub Database.`)
        })

        mongoose.connection.on('err', async (error) => {
            console.log(error)
        })

    }
}
