import { Router } from "express";
import { register, login } from "../controllers/authController";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import {
  validateRegister,
  validateLogin,
  validateTodo,
  validateUpdateTodo,
} from "../middlewares/validator";
import { verifyToken } from "../middlewares/authMiddleware"; // Diubah ke verifyToken

const router = Router();

// Endpoint Autentikasi (Public)
router.post("/auth/register", validateRegister, register);
router.post("/auth/login", validateLogin, login);

// Endpoint Todos (Protected - Membutuhkan Token JWT)
router.get("/todos", verifyToken, getTodos);
router.get("/todos/:id", verifyToken, getTodoById);
router.post("/todos", verifyToken, validateTodo, createTodo);
router.put("/todos/:id", verifyToken, validateUpdateTodo, updateTodo);
router.delete("/todos/:id", verifyToken, deleteTodo);

export default router;
