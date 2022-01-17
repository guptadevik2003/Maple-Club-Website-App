const express = require('express')
const nodeMailerSend = require('./nodeMailer').sendMail
const webBotsUptime = require('../schemas/webBotsUptime')

module.exports = setInterval( async () => {

    mainLoopFunction()

}, 10 * 1000);



async function mainLoopFunction() {

    let webBotsUptimeData = await webBotsUptime.find()

    webBotsUptimeData.forEach(async (botData) => {
        
        let timeNow = Date.now()

        webBotPerDayData = await express.webBotsPerDay.findOne({ botUserId: botData.botUserId })

        console.log(botData)
        console.log(webBotPerDayData)

        let offlineForTime = timeNow - botData.lastPingedTimestamp

        // IF Greater than 5 mins
        if (offlineForTime > 300000) {

            // Setting the last offline timestamp in the DB
            webBotsUptime.findOneAndUpdate({ botUserId: botData.botUserId }, {
                lastOfflineTimestamp: botData.lastPingedTimestamp
            })


        
        }

    })

}
