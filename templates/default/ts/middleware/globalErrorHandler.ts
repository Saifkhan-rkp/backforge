import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";

const globalErrorHadler: ErrorRequestHandler = (error, _req, res, _next) =>{
    console.log(error);
    if (!error.statusCode) {
        error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    res.statusCode = error.statusCode;
    res.send({
        success: false,
        message: error.message || httpStatus["500_MESSAGE"]
    });
}