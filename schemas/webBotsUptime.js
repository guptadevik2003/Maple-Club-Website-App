const mongoose = require('mongoose')

const webBotsUptime = new mongoose.Schema({

    botUserId: {
        type: String,
        required: true,
        unique: true
    },
    botUserName: {
        type: String
    },
    lastPingedTimestamp: {
        type: Number
    },
    lastOfflineTimestamp: {
        type: Number
    },
    botOwnerId: {
        type: String,
        required: true
    },
    botNotifyServerId: {
        type: String
    },
    botNotifyChannelId: {
        type: String
    },
    botNotifyEmailId: {
        type: String
    },
    botNotifyDMId: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model('webBotsUptime', webBotsUptime, 'webBotsUptime')
