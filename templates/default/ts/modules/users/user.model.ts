import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
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

const User = model("User", UserSchema);

export default User
