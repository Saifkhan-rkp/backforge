/**
 * @readonly 
 * seaprates mongoose model related operations
 */

const Users = require("./users.model")

/** this is pre written template please do necessory changes */
const creteUsers = async (usersBody) => {
    const result = await Users.create(usersBody);
    return result.toObject();
}

const updateUsers = async (id, updateBody) => {
    const result = await Users.updateOne({ _id: id }, updateBody);
    return result;
}

const getUsers = async (id) => {
    const result = await Users.findOne({ _id: id });
    return result;
}

const deleteUsers = async (id) => {
    const result = await Users.deleteOne({ _id: id });
    return result;
}

module.exports.UsersService = { creteUsers, updateUsers, deleteUsers, getUsers }
