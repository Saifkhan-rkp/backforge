import { Request, Response } from 'express'
import { catchAsync } from "../../utils/catchAsync";
import { TestServices } from './test.service';
import sendResponse from '../../utils/sendResponse';
import { isValidObjectId } from 'mongoose';
import ApiError from '../../configs/errors';
import httpStatus from 'http-status';

export const createTest = catchAsync(async (req: Request, res: Response) => {
    const testBody = req.body;
    const result = await TestServices.creteTest(testBody);

    sendResponse(res, {
        success: Object.keys(result).length > 0,
        statusCode: httpStatus.CREATED,
        data: result,
        message: "Test Document is created"
    })
})


export const getTest = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        throw new ApiError("Invalid Test reference id", httpStatus.UNPROCESSABLE_ENTITY)
    }
    const result = await TestServices.getTest(id);

    sendResponse(res, {
        success: result ? true : false,
        statusCode: result ? 200 : 404,
        data: result
    })
})


export const updateTest = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateBody = req.body;
    if (!isValidObjectId(id)) {
        throw new ApiError("Invalid Test reference id", httpStatus.UNPROCESSABLE_ENTITY)
    }
    const result = await TestServices.updateTest(id, updateBody);
    const isModified = result.modifiedCount > 0;
    sendResponse(res, {
        success: isModified,
        statusCode: isModified ? httpStatus.OK : httpStatus.NOT_MODIFIED,
        message: `Requested Document ${isModified ? "" : "not"} modified`
    });
})


export const deleteTest = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        throw new ApiError("Invalid Test reference id", httpStatus.UNPROCESSABLE_ENTITY)
    }
    const result = await TestServices.deleteTest(id);
    const isDeleted = result.deletedCount > 0
    sendResponse(res, {
        success: isDeleted,
        statusCode: isDeleted ? httpStatus.OK : httpStatus.NOT_MODIFIED,
        message: `Requested Document ${isDeleted ? "" : "not"} deleted`
    })
})