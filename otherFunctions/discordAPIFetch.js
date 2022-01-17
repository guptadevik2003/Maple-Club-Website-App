const fetch = require('node-fetch')

module.exports.fetchMe = async (access_token) => {
    let result
    const apiURL = `https://discord.com/api/users/@me`
    await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        result = data
    })
    return result
}

const bitFieldChecker = require('./bitFieldChecker')

module.exports.fetchGuildsWithManageServerPerms = async (access_token) => {
    let result = []
    let guilds
    const apiURL = `https://discord.com/api/users/@me/guilds`
    await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        guilds = data
    })
    guilds.forEach(async guild => {
        const ManageGuildPerm = await bitFieldChecker.MANAGE_GUILD(Number(guild.permissions_new))
        if (ManageGuildPerm == true) {
            result.push(guild)
        }
    })
    return result
}
