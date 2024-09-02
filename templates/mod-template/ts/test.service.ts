import { ObjectId } from "mongoose"
import Test from "./module.model"

/** this is pre written template please do necessory changes */
const creteTest = async (testBody: any) => {
    const result = await Test.create(testBody)
    return result.toObject()
}

const updateTest = async (id: string | ObjectId, updateBody: any) => {
    const result = await Test.updateOne({ _id: id }, updateBody);
    return result;
}

const getTest = async (id: string | ObjectId) => {
    const result = await Test.findOne({ _id: id });
    return result;
}

const deleteTest = async (id: string | ObjectId) => {
    const result = await Test.deleteOne({ _id: id });
    return result;
}

export const TestServices = { creteTest, updateTest, getTest, deleteTest };