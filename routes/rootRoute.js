const express = require('express')
const router = express.Router()

// Custom Modules
const userAuthenticator = require('../otherFunctions/userAuthenticator')

// /arc-sw.js
router.get('/arc-sw.js', async (req, res) => {
    res.sendFile(`${process.cwd()}/views/arc-sw.js`)
})

// /terms-of-service
router.get('/terms-of-service', async (req, res) => {
    res.render('terms-of-service.ejs')
})
router.get('/tos', async (req, res) => {
    res.redirect('/terms-of-service')
})
router.get('/terms', async (req, res) => {
    res.redirect('/terms-of-service')
})

// /privacy-policy
router.get('/privacy-policy', async (req, res) => {
    res.render('privacy-policy.ejs')
})
router.get('/privacy', async (req, res) => {
    res.redirect('/privacy-policy')
})

// /invite
router.get('/invite', async (req, res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=855017456284467210&permissions=2684742721&scope=bot%20applications.commands')
})

// /supportserver
router.get('/supportserver', async (req, res) => {
    res.redirect('https://discord.gg/TZuTr9dmSV')
})

// /
router.get('/', async (req, res) => {
    res.render('home.ejs')
})
router.get('/home', async (req, res) => {
    res.redirect('/')
})
router.get('/index', async (req, res) => {
    res.redirect('/')
})

// /login
router.get('/login', userAuthenticator.isNotAuth, async (req, res) => {
    res.redirect('/api/user/login')
})

module.exports = router
