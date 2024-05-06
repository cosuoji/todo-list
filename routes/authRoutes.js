import { Router } from "express";
import { generateMiddleware } from "../middleware/generatedMiddleware.js";
import * as authController from "../controller/authController.js"
import { loginSchema, registerSchema } from "../validations/authValidations.js";


const authRoute = Router();

//Authenticate routes, middleware to check login and register Schema

authRoute.get("/", (req, res)=>{
    res.render("index.ejs")
})

authRoute.get("/login", (req, res)=>{
    res.render("login.ejs")
})

authRoute.get("/register", (req, res)=>{
    res.render("register.ejs")
})


authRoute.post("/login", generateMiddleware(loginSchema), authController.login)
authRoute.post("/register", generateMiddleware(registerSchema), authController.register)


export default authRoute

