import Todo from "../models/todo.models.js"
import ApiError from "../utils/ApiError.js";
import ApiRes from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"

const getTodos = asyncHandler(async (req,res)=>{
    const todos = await Todo.find(); 
    res.status(200).json(new ApiRes(200,todos,"Todos Fetched Successfully."))
})

const createTodo = asyncHandler(async (req,res)=>{
    const todo = await Todo.create(req.body)
    // const todo = new Todo(req.body); 
    // await todo.save();
    return res.status(201).json(new ApiRes(201,todo,"Todo Created Successfully."))   
})

const updateTodo = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const todo = await Todo.findByIdAndUpdate(id,req.body,{new:true});

    if(!todo){
       throw new ApiError(404,"Todo Not Found")
    }
    return res.status(200).json(new ApiRes(200,todo,"Todo Updated SuccessFully"));
})

const deleteTodo = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const deleted = await Todo.findByIdAndDelete(id)
    return res.status(200).json(new ApiRes(200,deleted,"Todo Deleted SuccessFully"));
})

export {getTodos,createTodo,updateTodo,deleteTodo}