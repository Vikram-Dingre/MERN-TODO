import express from "express"
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controllers.js";

const router = express.Router();

router.route("/")
    .get(getTodos)
    .post(createTodo);

router.route("/:id")
    .put(updateTodo)
    .delete(deleteTodo);

export default router;