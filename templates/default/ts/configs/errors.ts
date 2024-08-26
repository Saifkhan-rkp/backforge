import httpStatus from "http-status";


export default class ApiError extends Error {
    statusCode;
    isOperational;
    date;

    constructor(message: string, statusCode: number = httpStatus.INTERNAL_SERVER_ERROR) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.isOperational = true;
        this.date = new Date();
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string = "Requested resource not found", statusCode: number = httpStatus.NOT_FOUND) {
        super(message, statusCode);
    }
}

