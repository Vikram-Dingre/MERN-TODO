import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { updateTodo } from '../features/todos/todoSlice';
import alertMsg from '../helper/alertMsg';

const Update = () => {
    const {id} = useParams();
    const {todos} = useSelector((state)=>state.todo);
    const [todo,setTodo] = useState(todos.find((item)=>item._id == id));

    const dispatch = useDispatch()
    const navigate = useNavigate()

   async function handleUpdate(){
    const {payload} = await dispatch(updateTodo({id,todo}))
        alertMsg(payload)
        navigate("/")
    }

    // useEffect(() => {
    //     setTodo(todos.find((item)=>item._id == id))
    // }, [])

  return <>
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
        <div className='flex gap-2 items-start flex-col justify-center border-2 p-8 rounded-md'>
            <h1 className='mb-2'>Update Todo</h1>
             <input onChange={(e)=>{setTodo({...todo,title:e.target.value})}} defaultValue={todo?.title} type="text" value={todo?.title} className='bg-gray-200 rounded-md p-2 px-5 ' placeholder='Title' />
             <input onChange={(e)=>setTodo({...todo,description:e.target.value})} type="text" value={todo?.description} className='bg-gray-200 rounded-md p-2 px-5' placeholder='Description' />
             <button className='bg-orange-300 rounded-md py-1.5 px-5 w-full ' onClick={handleUpdate} >Update</button>
        </div>
    </div>
  </>
}

export default Update
