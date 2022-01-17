const jwt = require('jsonwebtoken')

module.exports.createToken = async (discordId) => {
    const user = {
        discordId: discordId
    }
    const newToken = await jwt.sign(user, process.env.JWT_API_TOKEN_SECRET)
    return newToken
}

module.exports.isValidToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const prvdToken = authHeader && authHeader.split(' ')[1]
    if (!prvdToken) return res.status(401).json({ success: false, error: 'Authorization header with Bearer apiToken not Provided' })
    jwt.verify(prvdToken, process.env.JWT_API_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ success: false, error: 'Wrong apiToken Provided' })
        req.user = user
        next()
    })
}
