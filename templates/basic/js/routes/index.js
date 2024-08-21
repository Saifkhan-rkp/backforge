/**
 * Route registry file index.js
 */
const router = require('express').Router();

const routes = [
    {
        path: "/test",
        router: require('./test.route')
    },
    /**
     * Add similar object to create specific route
     */
]

routes.forEach(route => router.use(route.path, route.router))

module.exports = router;