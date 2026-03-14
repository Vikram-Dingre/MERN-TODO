import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import getErrorMessage from "../../helper/getErrorMessage";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/todo");
      // console.log(res)
      // res --> {
      /* data: {...}, --> data is ApiRes Obj sent by me from backend --> msg,status,data,success
  status: 200,
  headers: {},
  config: {},
  request: {}
  }
  */
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/todo", formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/todo/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateTodo = createAsyncThunk("todos/updateTodo", async ({id,todo},{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.put(`/todo/${id}`,todo)
        return data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error))
    }
})

export const test = createAsyncThunk("/test",async ()=>{
      const res = await axiosInstance.get("/todo");
      // console.log(res)
      // res --> {
      /* data: {...}, --> data is ApiRes Obj sent by me from backend --> msg,status,data,success
  status: 200,
  headers: {},
  config: {},
  request: {}
  }
  */
      return res.data;
})

const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: [], loading: false, error: "" },
  reducers: {},
  extraReducers: (builder) => {
    // fetch todos
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = ""
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.data;
        state.error=""
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.todos = []
      });

      // create todo
    builder
      .addCase(createTodo.pending, (state) => {
        // state.loading = false`;
        state.error = ""
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = ""
        state.todos.push(action.payload.data);
       
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.todos = []
      });

      // delete Todo
      builder
      .addCase(deleteTodo.pending, (state) => {
        // state.loading = true;
        state.error = ""
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = ""
        state.todos = state.todos.filter( item=> item._id != action.payload.data._id)
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.todos = []
      });

      // update todo
      builder
      .addCase(updateTodo.pending, (state) => {
        // state.loading = true;
        state.error = ""
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = ""
        state.todos = state.todos.map(item => item._id == action.payload.data._id ? action.payload.data : item)
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.todos = []
      });

  },
});

export const {} = todoSlice.actions;

export default todoSlice.reducer;
