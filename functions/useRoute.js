const userAuthenticator = require('../otherFunctions/userAuthenticator')

module.exports = ({ app, express }) => {
    express.useRoute = async () => {

        // Import Routes
        const rootRoute = require(`../routes/rootRoute`)
        const apiRoute = require(`../routes/apiRoute`)
        const dashboardRoute = require(`../routes/dashboardRoute`)

        // Using Routes
        app.use('/', rootRoute)
        app.use('/api', apiRoute)
        app.use('/dashboard', userAuthenticator.isAuth, dashboardRoute) // SECURED

    }
}
