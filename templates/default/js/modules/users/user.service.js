/**
 * @readonly 
 * seaprates mongoose model related operations
 */

const userModel = require("./user.model")


const getUser = async (id) => {
    const result = await userModel.findOne({ _id: id });
    return result
}

module.exports = { getUser }
