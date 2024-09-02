const mongoose = require('mongoose');
const catchAsync = require("../../utils/catchAsync");
const { NotFoundError, ApiError } = require("../../configs/errors");
const { TestService } = require("./test.service");

/** 
 * @function catchAsync(callbackFn)
 * try catch body inside function 
 * @returns (req, res, next) => {...code} 
 **/
const getTest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TestService.getTest(id);
    if (!result)
        throw new NotFoundError("Test not found");

    res.send({ success: true, data: result });
})

const updateTest = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updateBody = req.body;
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError("Invalid Test reference id", httpStatus.UNPROCESSABLE_ENTITY)
    }
    const result = await TestService.updateTest(id, updateBody);
    const isModified = result.modifiedCount > 0;
    res.status(isModified ? 200 : 304).send({ success: isModified, message: `Requested Document ${isModified ? "" : "not"} modified` });
})

const deleteTest = catchAsync(async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        throw new ApiError("Invalid Test reference id", httpStatus.UNPROCESSABLE_ENTITY)
    }
    const result = await TestService.deleteTest(id);
    const isDeleted = result.deletedCount > 0
    res.status(isDeleted ? 200 : 304).send({ success: isDeleted, message: `Requested Document ${isDeleted ? "" : "not"} deleted` });
})

const createTest = catchAsync(async (req, res) => {
    const testBody = req.body;
    const result = await TestService.creteTest(testBody);
    res.status(201).send({ success: Object.keys(result).length > 0, data: result, message: "Test Document is created" });
})

module.exports = { getTest, createTest, updateTest, deleteTest }