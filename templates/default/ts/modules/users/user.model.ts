const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
    { collection: "users" }
);

export default mongoose.model("User", UserSchema);
