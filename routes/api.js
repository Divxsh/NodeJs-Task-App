const express = require("express");
const { check } = require("express-validator");
const Login = require("../controllers/Login.Controller");
const Register = require("../controllers/Register.Controller");
const { createTodo, getTodos, updateTodo, removeTodo } = require("../controllers/Todo.Controller");
const { RegisterValidater, LoginValidator } = require("../utils/Validator");
const apiRoute = express.Router();
const protectedRoute = express.Router();

apiRoute.post("/register", RegisterValidater, Register);
apiRoute.post("/login", LoginValidator, Login);

protectedRoute.post("/createTodo", check("desc", "todo desc is required").exists(), createTodo,);
protectedRoute.get("/getTodos", getTodos);
protectedRoute.put("/updateTodo/:todoId", updateTodo);
protectedRoute.delete("/removeTodo/:todoId", removeTodo);

// check("todo_id", "todoid is required").exists()

module.exports = { apiRoute, protectedRoute };