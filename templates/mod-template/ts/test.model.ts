import { model, Schema } from 'mongoose'

const testSchema = new Schema({
    
    /** define your schema here */

}, {
    timestamps: true
});

const Test = model("test", testSchema);

export default Test