/**
 * @example Route registry file for user module: user.route.js
 * This file containes code to be refered as example for module.route files
 * @exports router express router is to be exported
 * 
*/
const { getTest, createTest, updateTest, deleteTest } = require('./test.controller');
const testRouter = require('express').Router();

testRouter.get("/get/:id", getTest);

testRouter.post("/create", createTest);

testRouter.put("/update/:id", updateTest);

testRouter.delete("/delete/:id", deleteTest);

module.exports = testRouter;