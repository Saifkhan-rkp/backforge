/**
 * @example Route registry file for user module: user.route.js
 * This file containes code to be refered as example for module.route files
 * @exports router express router is to be exported
 * 
 */
const { returnSelf } = require('./user.controller').default;
const router = require('express').Router();

router.get("/:id", returnSelf);

/**
 * @readonly most likely above method used using middleware
 * @example router.get("/me", verifyAuth, returnSelf);
 * 
 */

module.exports = router;