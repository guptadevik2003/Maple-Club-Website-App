const express = require('express')
const router = express.Router()

// Custom Modules
const discordAPIFetch = require('../otherFunctions/discordAPIFetch')
const bitFieldChecker = require('../otherFunctions/bitFieldChecker')

// THE WHOLE DASHBOARD IS SECURED IN USEROUTE FUNCTION

// /dashboard
router.get('/', async (req, res) => {
    const guilds = await discordAPIFetch.fetchGuildsWithManageServerPerms(req.session.access_token)
    res.render('dashboard.ejs', {
        user: req.session.user,
        guilds: guilds
    })
})

module.exports = router
