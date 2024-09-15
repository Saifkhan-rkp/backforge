const { default: mongoose } = require("mongoose");

const usersSchema = new mongoose.Schema({

    /** define your schema here */

}, {
    timestamps: true,
});

module.exports = mongoose.model("Users", usersSchema);
