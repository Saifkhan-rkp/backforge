import mongoose, { Schema } from 'mongoose'

const testSchema = new Schema({
    
    /** define your schema here */

}, {
    timestamps: true
});

const Test = mongoose.model("test", testSchema);

export default Test