const { MongoClient } = require('mongodb')

module.exports = ({ app, express }) => {
    express.mongoDBLogin = async () => {

        const mongoClient = new MongoClient(process.env.MAPLECLUB_MONGODB)

        await mongoClient.connect()

        console.log(`MongoDB Connected to Project MapleClub Database.`)

        express.webBotsPerDay = mongoClient.db('myFirstDatabase').collection('webBotsPerDay')

    }
}
