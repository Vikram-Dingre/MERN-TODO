import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../features/todos/todoSlice";
import { Link } from "react-router-dom";
import alertMsg from "../helper/alertMsg";

const Todo = ({item}) => {

  
  const {_id:id,title,description,completed} = item;
  
  
  const [success,setSuccess] = useState(completed)
  const {todos} = useSelector((state)=>state.todo)

  // console.log(todos[idx]?.completed)

    const dispatch = useDispatch()

    async function handleDelete(){
       const {payload} = await dispatch(deleteTodo(id));
       alertMsg(payload)
    }

    function handleComplete(){
      const newValue = !success
      setSuccess(newValue)
      const todo = {completed:newValue}
      dispatch(updateTodo({id,todo}))
    }

  return (
    <div
      className="w-full flex justify-between items-center bg-gray-200 px-4 py-2 rounded-md my-2 "
    >
      <input type="checkbox" checked={success} onChange={handleComplete}/>
      <p className="text-sm bg-none">{title}</p>
      <p className="text-sm bg-none">{description}</p>
      <div className="flex items-center justify-center gap-2">
        <Link to={`/update/${id}`} className="rounded-sm bg-green-300 px-2 text-sm py-1">
          Edit
        </Link>
        <button onClick={handleDelete} className="bg-red-300 rounded-sm px-2 text-sm py-1">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
