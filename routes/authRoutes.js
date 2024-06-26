import { Router } from "express";
import { generateMiddleware } from "../middleware/generatedMiddleware.js";
import * as authController from "../controller/authController.js"
import { loginSchema, registerSchema } from "../validations/authValidations.js";
import logger from "../logger/logger.js"


const authRoute = Router();

//Authenticate routes, middleware to check login and register Schema

authRoute.get("/", (req, res)=>{
    logger.info("home page")
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
authRoute.get("/logout", authController.logout)

export default authRoute

