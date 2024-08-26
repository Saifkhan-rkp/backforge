/**
 * 
 * @example Controlller function example for user: user.controller.js 
 */

import { Request, Response } from "express";
import ApiError, { NotFoundError } from "../../configs/errors";
import { catchAsync } from "../../utils/catchAsync";
import userService from './user.service'
import mongoose from "mongoose";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

/** 
 * @function catchAsync(callbackFn)
 * try catch body inside function 
 * @returns (req, res, next) => {...code} 
 **/
const returnSelf = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError("Invalid Id provided", httpStatus.UNPROCESSABLE_ENTITY)
    }
    const result = await userService.getUser(id);
    if (!result)
        throw new NotFoundError("User not found");

    sendResponse(res, { success: true, data: result, message: "User Found" })
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const allUsers = await userService.getAllUser();
    sendResponse(res, { 
        success: true,
        message:allUsers.length === 0?"NO Record found":"Retrived users successfuly", 
        data: allUsers, 
        statusCode: 200
    });
})

export { returnSelf, getAllUser } 