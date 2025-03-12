import { model, Schema } from "mongoose";

const userSchema = Schema({
    s_id: Number,
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    age: {
        type: Number,
        required: false
    }
})

const userModel =  model("newuser", userSchema);

export {userModel};