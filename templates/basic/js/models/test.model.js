/**
 * This is autogenerated file is for reference purpose 
 * you can edit/rename or delete according to your need
 * 
 * !!! Recommanded delete this file after reference
 */

const { default: mongoose } = require("mongoose");

const testSchema = new mongoose.Schema({
    exampleNum:{ type:Number, },
    exampleStr:{ type:String, },
    exampleBool:{ type:Boolean, },
    /**
     * ...And so on 
     * for more types refer "mongoose.Types" were you get all usefull types
     */
},{
    timestamps:true
});

module.exports = mongoose.model("test_Model", testSchema);