const cors = require('cors');

let origins = process.env.ALLOW_ORIGINS || ' http://localhost:3000,   j  '

if (origins.trim().length == 0) {
    origins = "http://localhost:3000";
}
const ALLOW_ORIGINS = origins
    .split(",")
    .map(origin => origin.trim())
    .filter(origin => origin !== "")


const corsOptions = {
    origin: ALLOW_ORIGINS,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Access-Control-Allow-Headers',
    ],
};

const securityMiddleware = (app) => {

    /** Removes x-powered-by */
    app.disable('x-powered-by');

    /** Apply CORS with Specified CORS Options */
    app.use(cors(corsOptions));

    /**
     * 
     * Add any specific security related middleware here
     * 
     */
}

module.exports = securityMiddleware;