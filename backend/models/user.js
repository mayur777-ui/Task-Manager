import mongoose from "mongoose";
import {Schema} from 'mongoose';

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },

})

const USER = mongoose.model("USER",userSchema);
export default USER;