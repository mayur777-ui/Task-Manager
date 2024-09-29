import mongoose from "mongoose";
import { Schema } from "mongoose";
import User from './user.js'; 

const taskSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',  
        required: true, 
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});


const Task = mongoose.model("Task", taskSchema);

export default Task;
