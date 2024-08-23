/**
 * 
 * @example Controlller function example for user: user.controller.js 
 */

const catchAsync = require("../../utils/catchAsync");
const NotFoundError = require("../../configs/errors");
const { getUser } = require("./user.service");

/** 
 * @function catchAsync(callbackFn)
 * try catch body inside function 
 * @returns (req, res, next) => {...code} 
 **/
const returnSelf = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await getUser(id);
    if (!result)
        throw new NotFoundError("User not found");

    res.send({ success: true, data: result });
})

module.exports = { returnSelf }