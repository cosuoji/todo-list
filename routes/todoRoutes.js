import { Router } from "express";
import * as todoController from "../controller/todoController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const todoRoute = Router();
todoRoute.get("/", authMiddleware, todoController.getAllTodos)
todoRoute.post('/', authMiddleware, todoController.addToDo)
todoRoute.put('/', authMiddleware,todoController.updateToDo)
todoRoute.delete('/', todoController.deleteToDo)

export default todoRoute