import express from "express";
import cors from "cors";
import globalErrorHandler from "./utils/globalErrorHandler.js";
import todoRouter from "./routes/todo.routes.js";

// CREATE APP
const app = express();

// MIDDLEWARES
app.use(
  cors()
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static('public'))

// ROUTES
app.use("/todo",todoRouter)

app.use(globalErrorHandler) // runs for any route any method if error comes after raising

// ************************First time Setup FLOW **************************** 
// setup server
// connect db
// ApiRes & ApiError
// asyncHandler
// Global error hadndler
// use globalErrorHanlder at bottom

// create a model
// create controller 
// setup its route using router (for single controller , or many)
// use router in app.js

// ******************** In Short **********************************
// server setup --> DB connect -->(utils) Api Res & Error --> asyncHandler --> GlobalErrorHandler --> (setup phase)

// model --> single controller --> router obj --> app.use() --> router. --> test -->(first route devlp phase) 
// or
// single controller --> router. --> test --> (except first time --> route developement cycle) 


export default app;
