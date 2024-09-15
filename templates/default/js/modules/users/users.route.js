/**
 * @example Route registry file for user users: user.route.js
 * This file containes code to be refered as example for users.route files
 * @exports router express router is to be exported
 * 
*/
const { getUsers, createUsers, updateUsers, deleteUsers } = require('./users.controller');
const usersRouter = require('express').Router();

usersRouter.get("/get/:id", getUsers);

usersRouter.post("/create", createUsers);

usersRouter.put("/update/:id", updateUsers);

usersRouter.delete("/delete/:id", deleteUsers);

module.exports = usersRouter;