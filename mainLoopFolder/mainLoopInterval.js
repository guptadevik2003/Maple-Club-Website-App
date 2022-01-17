const express = require('express')
const nodeMailerSend = require('./nodeMailer').sendMail

module.exports = setInterval( async () => {
    
    console.log( await express.webBotsPerDay.findOne({ guildId: '33' }) )

}, 10 * 60 * 1000);
