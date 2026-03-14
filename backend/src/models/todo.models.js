import mongoose from "mongoose"

// any one field should be required to get Todo Validation error when req.body will be empty

const todoSchema = new mongoose.Schema({
    title:{
        unique:true,
        type : String,
        required: true,
        trim:true,
    },
    description : {
        type : String,
        trim: true
    },
    completed :{
        type : Boolean,
        default : false
    }
},{timestamps:true});

const Todo = mongoose.model("Todo",todoSchema);

export default Todo;