const status = require('http-status');

class ApiError extends Error {
    statusCode;
    isOperational;
    date;

    constructor(message, statusCode = status.INTERNAL_SERVER_ERROR) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.isOperational = true;
        this.date = new Date();
    }
}

class NotFoundError extends ApiError {
    constructor(message = "Requested resource not found", statusCode = status.NOT_FOUND) {
        super(message, statusCode);
    }
}

module.exports = { ApiError, NotFoundError };