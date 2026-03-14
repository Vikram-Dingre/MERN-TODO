import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../components/Todo";
import { createTodo, fetchTodos, test } from "../features/todos/todoSlice";
import alertMsg from "../helper/alertMsg";

const Home = () => {
  const { todos, loading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const descRef = useRef(null);

  async function handleAddTodo() {
    const title = inputRef.current.value;
    const desc = descRef.current.value;
    const { payload } = await dispatch(
      createTodo({ title, description: desc, completed: false }),
    );
    alertMsg(payload)
    inputRef.current.value = "";
    descRef.current.value = "";
  }

  useEffect(() => {
    const fetch = async () => {
       dispatch(fetchTodos());
    };
    fetch();
  }, []);

  return (
    <div className="w-full h-[100vh] flex items-center  justify-center">
      <div className="flex items-start justify-center flex-col border-solid border-2 rounded-md p-8 ">
        <h1 className="w-full flex justify-center text-xl mb-5 font-medium">
          Todo App
        </h1>
        <p>{error}</p>
        <div>
          <input
            ref={inputRef}
            className=" bg-gray-200 p-[10px] mr-[10px] rounded-md "
            type="text"
            placeholder="Title"
          />
          <input
            ref={descRef}
            type="text"
            className=" bg-gray-200 p-[10px] m-[10px] rounded-md"
            placeholder="Description"
          />
          <button
            onClick={handleAddTodo}
            className="bg-orange-300 px-[17px] py-[10px] rounded-md"
          >
            Add
          </button>
        </div>
        <h1 className="font-medium my-3 text-lg">Your Todos</h1>
        {!loading ? (
          <div className="w-full h-full">
            {todos.length > 0
              ? todos.map((item, idx) => {
                  return <Todo item={item} key={idx} />;
                })
              : "No Todos Found!"}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      
    </div>
  );
};

export default Home;
