const { example } = require('../controllers/test.controller');
const router = require('express').Router();

router.get("/example", example);

/**
 * Add another routes here with respective controller function 
 */

module.exports = router;