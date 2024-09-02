const { default: mongoose } = require("mongoose");

const testSchema = new mongoose.Schema({

    /** define your schema here */

}, {
    timestamps: true,
});

module.exports = mongoose.model("Test", testSchema);
