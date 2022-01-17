const express = require('express')
const router = express.Router()
const webBotsUptime = require('../schemas/webBotsUptime')
const websiteUsers = require('../schemas/websiteUsers')

// Custom Modules
const discordAPIFetch = require('../otherFunctions/discordAPIFetch')
const userAuthenticator = require('../otherFunctions/userAuthenticator')
const JsonWebToken = require('../otherFunctions/JsonWebToken')

// /api
router.get('/', async (req, res) => {
    res.json({ success: true, message: 'api_route_working' })
})

// <========== USER API ROUTES ==========>

// /api/user/login
router.get('/user/login', userAuthenticator.isNotAuth, async (req, res) => {
    const scopes = `identify email guilds`
    const client_id = `855017456284467210`
    let redirectURI
    if (process.env.BUILD_MODE === 'development') {
        redirectURI = `http://localhost:${process.env.PORT}/api/discord-redirect` }
    if (process.env.BUILD_MODE === 'production') {
        redirectURI = 'https://mapleclub.top/api/discord-redirect' }
    let authURL = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirectURI}&state=MapleClubTopWebsite&scope=${scopes}&show_dialog=false`
    res.redirect(authURL)
})

// /api/user/logout SECURED
router.post('/user/logout', userAuthenticator.isAuth, async (req, res) => {
    req.session.destroy()
    return res.redirect('/')
})

// Discord Login Redirect
router.get('/discord-redirect', userAuthenticator.isNotAuth, async (req, res) => {
    if (!req.url.includes('access_token')) return res.render('api-discord-redirect.ejs')
    const { token_type, access_token, expires_in, scope, state } = req.query
    if (!access_token) return res.redirect('/login')
    const userInfo = await discordAPIFetch.fetchMe(access_token)
    if (!userInfo.id) return res.redirect('/login')
    req.session.isAuth = true
    req.session.access_token = access_token
    req.session.user = userInfo
    const developers = ['741522321344430171']
    if (developers.includes(userInfo.id)) {
        req.session.isDev = true
    }
    return res.redirect('/dashboard')
})

// <========== BOT API ROUTES ==========>

// /api/bot/pingme
router.post('/bot/pingme', JsonWebToken.isValidToken, async (req, res) => {
    const pingTimestamp = Date.now()
    const { botUserId } = req.query
    if (!botUserId) return res.status(401).json({ success: false, error: 'No botUserId Provided' })
    let botData = await webBotsUptime.findOne({ botUserId: botUserId })
    if (!botData) return res.status(401).json({ success: false, error: 'Wrong botUserId Provided' })
    let updateData = await webBotsUptime.findOneAndUpdate({ botUserId: botUserId }, {
        lastPingedTimestamp: pingTimestamp
    })
    return res.json({
        success: true,
        data: {
            botUserId: botUserId,
            botUserName: updateData.botUserName,
            lastPingedTimestamp: pingTimestamp,
            lastOfflineTimestamp: updateData.lastOfflineTimestamp,
            botOwnerId: updateData.botOwnerId
        }
    })
})

module.exports = router
