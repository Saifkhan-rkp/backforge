import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import createError from 'http-errors'
import httpStatus from 'http-status';
import router from './routes';

const app = express();

/** Unknown error handler */
process.on('unhandledRejection', (reason) => {
    console.log(reason);
    process.exit(1);
});

/** Start-up/Home route */
app.get("/", (req, res) => {
    res.send({ success: true, message: "Its working..!" })
})

/** Middlewares */
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(morgan("dev"));

/** Routes */
app.use("/api", router)

/** 404 NOT FOUND handler */
app.use((req, res, next) => {
    const error = createError(404);
    next(error);
});

/** Global error handler */
app.use(function (error: any, _req: any, res: any, _next: any) {
    console.log(error);
    if (!error.statusCode) {
        error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    res.statusCode = error.statusCode;
    res.send({
        success: false,
        message: error.message || httpStatus["500_MESSAGE"]
    });
});

export default app