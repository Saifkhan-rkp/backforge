/**
 * @readonly 
 * seaprates mongoose model related operations
 */

const Test = require("./test.model")

/** this is pre written template please do necessory changes */
const creteTest = async (testBody) => {
    const result = await Test.create(testBody);
    return result.toObject();
}

const updateTest = async (id, updateBody) => {
    const result = await Test.updateOne({ _id: id }, updateBody);
    return result;
}

const getTest = async (id) => {
    const result = await Test.findOne({ _id: id });
    return result;
}

const deleteTest = async (id) => {
    const result = await Test.deleteOne({ _id: id });
    return result;
}

module.exports.TestService = { creteTest, updateTest, deleteTest, getTest }
