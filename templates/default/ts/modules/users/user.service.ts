/**
 * @readonly 
 * seaprates mongoose model related operations
 */

import userModel from "./user.model";

const getUser = async (id: string) => {
    const result = await userModel.findOne({ _id: id });
    return result
}

const getAllUser = async () => {
    const result = await userModel.find({});
    return result
}

export default { getUser, getAllUser } 
