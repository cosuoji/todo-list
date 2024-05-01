import { Router } from "express";
import { generateMiddleware } from "../middleware/generatedMiddleware.js";
import * as authController from "../controller/authController.js"
import { loginSchema, registerSchema } from "../validations/authValidations.js";

const authRoute = Router();

//Authenticate routes, middleware to check login and register Schema
authRoute.post("/login", generateMiddleware(loginSchema), authController.login)
authRoute.post("/register", generateMiddleware(registerSchema), authController.register)

export default authRoute