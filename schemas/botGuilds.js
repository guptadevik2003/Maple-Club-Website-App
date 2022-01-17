const mongoose = require('mongoose')

const botGuilds = new mongoose.Schema({

    guildName: {
        type: String
    },
    guildId: {
        type: String,
        required: true,
        unique: true
    },
    botPrefix: {
        type: String,
        required: true
    }

}, { timestamps: true } )

module.exports = mongoose.model('botGuilds', botGuilds, 'botGuilds')
