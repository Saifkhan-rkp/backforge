const mongoose = require('mongoose');
const httpStatus = require('http-status');
const catchAsync = require("../../utils/catchAsync");
const { NotFoundError, ApiError } = require("../../configs/errors");
const { UsersService } = require("./users.service");

/** 
 * @function catchAsync(callbackFn)
 * try catch body inside function 
 * @returns (req, res, next) => {...code} 
 **/
const getUsers = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UsersService.getUsers(id);
    if (!result)
        throw new NotFoundError("Users not found");

    res.send({ success: true, data: result });
})

const updateUsers = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updateBody = req.body;
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError("Invalid Users reference id", httpStatus.UNPROCESSABLE_ENTITY)
    }
    const result = await UsersService.updateUsers(id, updateBody);
    const isModified = result.modifiedCount > 0;
    res.status(isModified ? 200 : 304).send({ success: isModified, message: `Requested Document ${isModified ? "" : "not"} modified` });
})

const deleteUsers = catchAsync(async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        throw new ApiError("Invalid Users reference id", httpStatus.UNPROCESSABLE_ENTITY)
    }
    const result = await UsersService.deleteUsers(id);
    const isDeleted = result.deletedCount > 0
    res.status(isDeleted ? 200 : 304).send({ success: isDeleted, message: `Requested Document ${isDeleted ? "" : "not"} deleted` });
})

const createUsers = catchAsync(async (req, res) => {
    const usersBody = req.body;
    const result = await UsersService.creteUsers(usersBody);
    res.status(201).send({ success: Object.keys(result).length > 0, data: result, message: "Users Document is created" });
})

module.exports = { getUsers, createUsers, updateUsers, deleteUsers }