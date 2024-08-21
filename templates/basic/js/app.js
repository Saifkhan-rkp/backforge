const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes');
const securityMiddleware = require('./middleware/security.middleware');

const app = express();

/** Unknown error handler */
process.on('unhandledRejection', (reason) => {
    console.log(reason);
    process.exit(1);
});

/** Start-up/Home route */
app.get('/', (req, res) => { res.status(200).send({ success: true, message: "running..!" }) });

/** Middlewares */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
securityMiddleware(app)

/** Routes */
app.use("/api",router);

/** 404 NOT FOUND handler */
app.use((req, res, next) => {
    const error = createError(404);
    next(error);
});

/** Global error handler */
app.use((error, req, res, next) => {
    console.log(error);
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    res.statusCode = error.statusCode;
    res.send({
        success: false,
        message: error.message
    });
});

module.exports = app;